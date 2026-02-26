-- Add icon_name column to education table
-- Run this BEFORE running seed-education.sql

ALTER TABLE education
ADD COLUMN IF NOT EXISTS icon_name TEXT;

-- This allows you to store icon names like 'BookOpen', 'Award', 'GraduationCap'
