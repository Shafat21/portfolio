-- Insert Education Data
-- Run this in your Supabase SQL Editor after creating the tables

INSERT INTO education (
  degree,
  institution,
  field_of_study,
  start_date,
  end_date,
  current,
  gpa,
  description,
  location,
  icon_name,
  order_index
) VALUES
(
  'BSc in Software Engineering',
  'Metropolitan University',
  'Software Engineering',
  '2021-10-01',
  '2025-12-31',
  true,
  '3.48',
  'Currently pursuing Bachelor of Science in Software Engineering with focus on web development, software architecture, and database systems.',
  NULL,
  'BookOpen',
  1
),
(
  'Intermediate (12th Grade) [HSC]',
  'Jalalabad Cantonment Public School and College, Sylhet',
  'General Studies',
  '2018-07-01',
  '2020-03-31',
  false,
  '5.00',
  'Completed Higher Secondary Certificate with exceptional academic performance.',
  'Sylhet',
  'Award',
  2
),
(
  '10th Grade [SSC]',
  'Jalalabad Cantonment Public School and College, Sylhet',
  'General Studies',
  '2016-01-01',
  '2018-02-28',
  false,
  '4.70',
  'Completed Secondary School Certificate with strong academic foundation.',
  'Sylhet',
  'GraduationCap',
  3
);

-- All 3 education records have been added!
-- You can manage these through the admin dashboard at: /admin/dashboard/education
