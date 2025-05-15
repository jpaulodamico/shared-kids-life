
-- Function to add a child with proper RLS handling
CREATE OR REPLACE FUNCTION public.add_child(
  p_name TEXT,
  p_age INTEGER,
  p_birthday DATE,
  p_school TEXT,
  p_grade TEXT,
  p_teacher TEXT,
  p_blood_type TEXT,
  p_allergies TEXT[],
  p_medications TEXT[],
  p_height TEXT,
  p_weight TEXT,
  p_activities TEXT[],
  p_gender TEXT,
  p_image_url TEXT,
  p_initials TEXT,
  p_relation TEXT
) 
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_child_id UUID;
BEGIN
  -- Insert the child record
  INSERT INTO public.children(
    name, age, birthday, school, grade, teacher, blood_type,
    allergies, medications, height, weight, activities,
    gender, image_url, initials
  )
  VALUES(
    p_name, p_age, p_birthday, p_school, p_grade, p_teacher, p_blood_type,
    p_allergies, p_medications, p_height, p_weight, p_activities,
    p_gender, p_image_url, p_initials
  )
  RETURNING id INTO v_child_id;
  
  -- Create the association between user and child
  INSERT INTO public.user_children(
    user_id, child_id, relation
  )
  VALUES(
    auth.uid(), v_child_id, p_relation
  );
END;
$$;

-- Enable Row Level Security on children table if not already enabled
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for inserting children
CREATE POLICY IF NOT EXISTS "Users can insert children through function"
  ON public.children
  FOR ALL
  USING (true);  -- The function is SECURITY DEFINER so it will bypass RLS

-- RLS policy for user_children table
ALTER TABLE public.user_children ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can see their own children associations"
  ON public.user_children
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Users can insert their own children associations"
  ON public.user_children
  FOR INSERT
  WITH CHECK (user_id = auth.uid());
