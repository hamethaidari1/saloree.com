
-- Create a helper function to check if a user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, role_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE ur.user_id = has_role.user_id AND r.name = has_role.role_name
  );
END;
$$;

-- Create a helper function to check if the current user is a content_admin
CREATE OR REPLACE FUNCTION public.is_content_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN public.has_role(auth.uid(), 'content_admin') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin');
END;
$$;

-- Grant usage on the functions to authenticated users
GRANT EXECUTE ON FUNCTION public.has_role(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_content_admin() TO authenticated;
