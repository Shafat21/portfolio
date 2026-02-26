-- Insert Skills from hardcoded data
-- Run this in your Supabase SQL Editor after creating the tables

INSERT INTO skills (
  name,
  category,
  proficiency,
  icon_name,
  order_index
) VALUES
-- Front-End Development
(
  'HTML, CSS, JavaScript, React.js, Next.js, Typescript',
  'Frontend',
  90,
  'Code',
  1
),
-- Back-End Development
(
  'Node.js, Express, Next.js, Typescript',
  'Backend',
  85,
  'Server',
  2
),
-- Frameworks & Stacks
(
  'MERN, Next.js, Laravel',
  'Backend',
  88,
  'Layers',
  3
),
-- Databases
(
  'MongoDB, MySQL',
  'Database',
  85,
  'Database',
  4
),
-- FiveM Development
(
  'Lua, JavaScript, QBCore, ESX',
  'Other',
  92,
  'Network',
  5
),
-- Discord Bot Development
(
  'Discord.js, Node.js',
  'Backend',
  87,
  'Code2',
  6
),
-- Web Design
(
  'Figma, Adobe XD, Photoshop',
  'Design',
  80,
  'Cloud',
  7
),
-- UI/UX Design
(
  'Wireframing, Prototyping',
  'Design',
  83,
  'PencilRuler',
  8
),
-- Version Control
(
  'Git, GitHub',
  'DevOps',
  90,
  'FileText',
  9
);
