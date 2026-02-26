-- Insert Experience from hardcoded data
-- Run this in your Supabase SQL Editor after creating the tables

INSERT INTO experience (
  company,
  position,
  start_date,
  end_date,
  current,
  description,
  location,
  employment_type,
  technologies,
  order_index
) VALUES
-- Al Quran Institute
(
  'Al Quran Institute',
  'Project Manager',
  '2023-01-01',
  NULL,
  true,
  E'Managing the institute''s website, overseeing content updates, user registrations, and technical support for online Quran study courses.\n\n📱 Course Registration System - Implementing and maintaining the online registration system for various modules and courses offered by the institute.\n\n📋 Project Coordination & Team Management - Coordinating between technical teams and educational staff to ensure smooth operation of the online learning platform.',
  'Remote',
  'Full-time',
  ARRAY['Website Management', 'Project Management', 'Team Coordination', 'Course Registration System'],
  1
),
-- BrightBrainAI
(
  'BrightBrainAI',
  'Web Developer',
  '2023-01-01',
  NULL,
  true,
  E'Developing web applications with AI integration, focusing on user experience and modern design principles.\n\n🛠️ Frontend Development - Building responsive and interactive user interfaces using modern JavaScript frameworks and libraries.\n\n🔄 API Integration - Implementing API connections between frontend applications and backend AI services.',
  'Remote',
  'Full-time',
  ARRAY['React.js', 'Next.js', 'AI Integration', 'API Development', 'Frontend Development'],
  2
),
-- Dragon Design Studio
(
  'Dragon Design Studio',
  'Front-end Developer Intern',
  '2020-10-01',
  '2021-02-28',
  false,
  E'Assisted in developing user interfaces for client websites, focusing on responsive design and cross-browser compatibility.\n\n🖼️ Web Design Implementation - Converted design mockups into functional web pages using HTML, CSS, and JavaScript.\n\n🔍 Quality Assurance - Participated in testing and debugging web applications to ensure optimal performance and user experience.',
  'Remote',
  'Internship',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI Development'],
  3
);
