-- Criar tabela de empresas
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  plan_name TEXT NOT NULL DEFAULT 'Light',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Users can view their own company"
ON public.companies
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own company"
ON public.companies
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company"
ON public.companies
FOR UPDATE
USING (auth.uid() = user_id);

-- Criar tabela de impostos
CREATE TABLE public.taxes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  tax_type TEXT NOT NULL,
  due_date DATE NOT NULL,
  amount DECIMAL(10, 2),
  paid BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.taxes ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para impostos
CREATE POLICY "Users can view their company taxes"
ON public.taxes
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.companies
    WHERE companies.id = taxes.company_id
    AND companies.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create taxes for their company"
ON public.taxes
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.companies
    WHERE companies.id = taxes.company_id
    AND companies.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their company taxes"
ON public.taxes
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.companies
    WHERE companies.id = taxes.company_id
    AND companies.user_id = auth.uid()
  )
);

-- Criar tabela de certidões
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para certidões
CREATE POLICY "Users can view their company certificates"
ON public.certificates
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.companies
    WHERE companies.id = certificates.company_id
    AND companies.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create certificates for their company"
ON public.certificates
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.companies
    WHERE companies.id = certificates.company_id
    AND companies.user_id = auth.uid()
  )
);

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Adicionar triggers para updated_at
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_taxes_updated_at
BEFORE UPDATE ON public.taxes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();