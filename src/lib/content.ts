// All copy and links for the portfolio live here. Edit this file to update the site.
// Project repository and live demo links are empty until you add them.

export const profile = {
  name: 'Impana K.',
  shortName: 'IK',
  role: 'Software Developer',
  badge: 'Computer Science Engineering Student | RUAS',
  email: 'impanakrishna7@gmail.com',
  phone: '+91 9113985427',
  photo: '/images/WhatsApp_Image_2026-11-07_at_4.58.55_PM.jpeg' as string | null,
  // Place your PDF at public/resume.pdf and the Download Resume button activates automatically.
  resumeUrl: '/resume.pdf',
};

export const hero = {
  headline: ['IDEAS INTO', 'INNOVATION.'],
  intro:
    'Hi, I’m Impana K. A Computer Science Engineering student passionate about technology, creative problem-solving and building meaningful digital experiences.',
  tagline: 'Curious mind. Creative thinking. Building what’s next.',
};

export type SocialLink = {
  label: string;
  href: string;
  icon: 'instagram' | 'linkedin' | 'github';
};

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/impana_krishna_/', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/impana-k-696785394/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/impanak19', icon: 'github' },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

export const about = {
  eyebrow: 'About me',
  headline: 'Learning by building.',
  intro: [
    'Hi, I’m Impana, a second-year Computer Science Engineering student at Ramaiah University of Applied Sciences. I’m passionate about exploring technology, creative problem-solving and building meaningful digital experiences.',
    'I enjoy learning new technologies, experimenting with ideas and combining creativity with technology to create impactful solutions. I’m continuously developing my skills in programming, web development and modern digital tools.',
    'I believe in learning by building, thinking creatively and turning ideas into reality.',
  ],
  interests: [
    'Learning new technologies',
    'Creative problem-solving',
    'Web development',
    'AI tools',
    'Building digital experiences',
  ],
  education: [
    { label: 'Institution', value: 'Ramaiah University of Applied Sciences (RUAS)' },
    { label: 'Program', value: 'Computer Science Engineering' },
    { label: 'Current year', value: 'Second year' },
  ],
};

export type Service = {
  title: string;
  description: string;
  icon: 'book' | 'bulb' | 'cpu' | 'layers';
  accent: 'electric' | 'cobalt' | 'hotpink' | 'sunset';
};

export const services: Service[] = [
  {
    title: 'Learning by Building',
    description: 'I learn fastest by making things, testing ideas and improving them through hands-on projects.',
    icon: 'book',
    accent: 'electric',
  },
  {
    title: 'Creative Problem-Solving',
    description: 'I approach challenges with curiosity and look for clear, practical solutions that actually work.',
    icon: 'bulb',
    accent: 'hotpink',
  },
  {
    title: 'Modern Technology',
    description: 'I keep exploring programming, web development and AI tools to stay current with how things are built.',
    icon: 'cpu',
    accent: 'cobalt',
  },
  {
    title: 'Meaningful Experiences',
    description: 'I aim to build digital experiences that are useful, thoughtful and easy for people to use.',
    icon: 'layers',
    accent: 'sunset',
  },
];

export type SkillGroup = {
  title: string;
  icon: 'code' | 'globe' | 'wand';
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { title: 'Programming', icon: 'code', items: ['Python', 'C', 'C++', 'JavaScript'] },
  { title: 'Web Development', icon: 'globe', items: ['HTML', 'CSS'] },
  { title: 'Creative & Technical', icon: 'wand', items: ['AI Tools', 'UI/UX Design', 'Problem Solving'] },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: 'electric' | 'cobalt' | 'hotpink' | 'sunset';
  icon: 'car' | 'clipboard' | 'compass';
  repoUrl: string;
  liveUrl: string;
};

export const projects: Project[] = [
  {
    id: 'roadwatch-ai',
    title: 'RoadWatch AI',
    category: 'AI Concept',
    description:
      'An AI-powered traffic surveillance concept focused on identifying suspicious or potentially problematic vehicle activity and supporting road safety.',
    tags: ['Artificial Intelligence', 'Road Safety', 'Traffic Surveillance'],
    accent: 'electric',
    icon: 'car',
    repoUrl: '',
    liveUrl: '',
  },
  {
    id: 'campus-issue-reporter',
    title: 'Campus Issue Reporter',
    category: 'University Platform',
    description:
      'A university issue-reporting platform designed to help students report campus problems and allow authorized university staff to manage and resolve reported issues.',
    tags: ['Web Platform', 'Issue Tracking', 'Campus Operations'],
    accent: 'sunset',
    icon: 'clipboard',
    repoUrl: '',
    liveUrl: '',
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'Creative Website',
    description:
      'A creative personal portfolio showcasing my identity, technical skills, projects and journey as a Computer Science Engineering student.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    accent: 'hotpink',
    icon: 'compass',
    repoUrl: '',
    liveUrl: '',
  },
];
