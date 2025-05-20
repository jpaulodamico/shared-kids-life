
-- Create the is_primary_user function in the database
CREATE OR REPLACE FUNCTION public.is_primary_user()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_primary boolean;
BEGIN
  SELECT ur.is_primary INTO is_primary
  FROM public.user_roles ur
  WHERE ur.user_id = auth.uid();
  
  RETURN COALESCE(is_primary, false);
END;
$$;
