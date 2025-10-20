import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, phone } = await req.json();

    if (!email || !phone) {
      throw new Error('Email e telefone são obrigatórios');
    }

    // Get credentials from environment
    const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
    const sheetId = Deno.env.get('GOOGLE_SHEET_ID');

    if (!serviceAccountJson || !sheetId) {
      throw new Error('Credenciais do Google Sheets não configuradas');
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    // Create JWT for Google OAuth
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    // Encode header and claim
    const encoder = new TextEncoder();
    const b64Header = btoa(JSON.stringify(header));
    const b64Claim = btoa(JSON.stringify(claim));
    const signatureInput = `${b64Header}.${b64Claim}`;

    // Import private key
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = serviceAccount.private_key.substring(
      pemHeader.length,
      serviceAccount.private_key.length - pemFooter.length - 1
    );
    const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
      'pkcs8',
      binaryDer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    // Sign the JWT
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      key,
      encoder.encode(signatureInput)
    );

    const b64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)));
    const jwt = `${signatureInput}.${b64Signature}`;

    // Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error('Token error:', tokenData);
      throw new Error('Falha ao obter token de acesso do Google');
    }

    // Append data to Google Sheets
    const timestamp = new Date().toLocaleString('pt-BR');
    const appendResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:C:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[timestamp, email, phone]],
        }),
      }
    );

    if (!appendResponse.ok) {
      const errorText = await appendResponse.text();
      console.error('Sheets API error:', errorText);
      throw new Error('Falha ao adicionar dados à planilha');
    }

    console.log('Lead salvo com sucesso:', { email, phone });

    return new Response(
      JSON.stringify({ success: true, message: 'Lead salvo com sucesso' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in save-lead-to-sheets function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
