-- Insert Projects from hardcoded data
-- Run this in your Supabase SQL Editor after creating the tables

INSERT INTO projects (
  title,
  description,
  tech_stack,
  link,
  github_link,
  icon_name,
  type,
  category,
  featured,
  pinned,
  order_index
) VALUES
-- Featured Live Projects
(
  'Al Quran Institute',
  'Educational platform for Quran studies with course registration and management',
  'Next.js, Tailwind, Express, API',
  'https://alquraninstitute.net/',
  NULL,
  'BookOpen',
  'live',
  'Web',
  true,
  true,
  1
),
(
  'BrightBrainAI',
  'AI-powered solutions platform with modern interface and interactive features',
  'WordPress',
  'https://brightbrainai.com/',
  NULL,
  'Brain',
  'live',
  'Web',
  true,
  true,
  2
),
(
  'HeartLand Exteriors Twister City LLC',
  'Full Service Exteriors & General Contracting Crew For Builders of all Kinds',
  'Next.js, Tailwind, JSON, SQLite',
  'https://www.twistercityexteriors.com/',
  NULL,
  'Globe',
  'live',
  'Web',
  true,
  true,
  3
),
(
  'Game Starr Group LLC',
  'Live Streaming Platform for Games, Community, Live Streaming',
  'Next.js, Tailwind, Discord, MongoDB, Socket.io',
  'https://gamestarrgroup.com/',
  NULL,
  'Globe',
  'live',
  'Web',
  true,
  true,
  4
),
(
  'The Commonwealth RP - FiveM Roleplay Server',
  'Are you looking to elevate your streaming content with a truly immersive, cinematic FiveM roleplay experience?',
  'Next.js, Tailwind',
  'https://thecommonwealthrp.com/',
  NULL,
  'Code',
  'live',
  'Web',
  false,
  true,
  5
),
(
  'The Reflection RP - Chinese FiveM Roleplay Server',
  'This is Traditional Chinese - So No Description',
  'Next.js, Tailwind',
  'https://www.dragon1688888.com/',
  NULL,
  'Code',
  'live',
  'Web',
  false,
  true,
  6
),
(
  'BlazedRP - FiveM Roleplay Server',
  'Experience next-level roleplay in our meticulously crafted world with custom jobs, properties, and a thriving economy.',
  'Next.js, Tailwind',
  'https://blazedrp.vercel.app/',
  NULL,
  'Code',
  'live',
  'Web',
  false,
  false,
  7
),
(
  'GSRP FiveM Website',
  'Join Georgia State Role Play, a premier FiveM roleplay server featuring law enforcement, emergency services, and realistic civilian life.',
  'Next.js, Tailwind, FiveM API',
  'https://gsrp-three.vercel.app/',
  NULL,
  'Code',
  'live',
  'Web',
  false,
  false,
  8
),

-- FiveM Projects
(
  'Lunar Contact Admin',
  'Admin panel for managing player donations and experience in FiveM servers',
  'Lua, JavaScript, ox_lib',
  NULL,
  'https://github.com/Shafat21/Lunar-Contact-Admin',
  'Car',
  'github',
  'FiveM',
  true,
  false,
  9
),
(
  'Ambulance Job System',
  'Comprehensive ambulance job and EMS system for FiveM roleplay servers',
  'Lua, JavaScript, ESX Framework',
  NULL,
  'https://github.com/Shafat21/shafat_ambulancejob',
  'Heart',
  'github',
  'FiveM',
  false,
  false,
  10
),
(
  'Hen Hunting System',
  'Hunting system with realistic mechanics for FiveM roleplay servers',
  'Lua, JavaScript, QBCore',
  NULL,
  'https://github.com/Shafat21/shafat_henhunting',
  'Car',
  'github',
  'FiveM',
  false,
  false,
  11
),
(
  'smAidoc',
  'Medical documentation and healthcare system for FiveM roleplay servers',
  'Lua, JavaScript, ESX Framework',
  NULL,
  'https://github.com/Shafat21/smAidoc',
  'Car',
  'github',
  'FiveM',
  false,
  false,
  12
),

-- Web Projects
(
  'Blogging Website',
  'Full-featured blogging platform with user authentication and content management',
  'React.js, Firebase, MongoDB',
  NULL,
  'https://github.com/Shafat21/Blogging-Website-with-ReactJS',
  'BookOpen',
  'github',
  'Web',
  false,
  false,
  13
),
(
  'ProManage EMS',
  'Employee Management System with comprehensive HR and administrative features',
  'PHP, MySQL, Bootstrap',
  NULL,
  'https://github.com/Shafat21/ProManage',
  'Users',
  'github',
  'Web',
  false,
  false,
  14
),
(
  'Pharmacy Management',
  'Inventory and sales management system for pharmacies with CRUD operations',
  'React.js, Node.js, MongoDB',
  NULL,
  'https://github.com/Shafat21/React-Crud-Operation-Pharmacy-management',
  'Pill',
  'github',
  'Web',
  false,
  false,
  15
),

-- Python Projects
(
  'FTP Client & Server',
  'Custom implementation of FTP protocol with client and server components',
  'Python, Socket Programming',
  NULL,
  'https://github.com/Shafat21/FTP-Server-Client',
  'Server',
  'github',
  'Python',
  false,
  false,
  16
),

-- IoT Projects
(
  'Smart Fire & Gas Detector',
  'IoT-based system for detecting fire and gas leaks with real-time alerts',
  'Arduino, Sensors, IoT Protocols',
  NULL,
  'https://github.com/Shafat21/Smart-IoT-Fire-and-Gas-Detector',
  'Flame',
  'github',
  'IoT',
  false,
  false,
  17
);
