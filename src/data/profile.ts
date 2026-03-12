import type { Experience, Project, Skill } from '../types';

export const PROFILE = {
  name: 'Tishant Chandrakar',
  title: 'Full Stack Developer (BE Heavy)',
  email: 'tishantchandrakar007@gmail.com',
  phone: '+91-9068703837',
  location: 'Bangalore, India',
  github: 'https://github.com/tchandrakar',
  linkedin: 'https://www.linkedin.com/in/tishant-chandrakar/',
  education: {
    institution: 'Indian Institute of Technology, Roorkee',
    degree: 'B.Tech',
    gpa: '8.15/10 (Absolute)',
    period: 'July 2015 - April 2019',
    location: 'Roorkee',
  },
  certifications: [
    'Cybersecurity MIT Master Class',
    'CompTIA Security+',
    'CEH v11 (Certified Ethical Hacker)',
    'CompTIA Network+',
  ],
  achievements: [
    'Heritage Student - IITR Heritage Annual Excellence Award, 2016, 2017 & 2018',
    'Secretary & Joint Secretary - Table Tennis Club, IIT Roorkee, Jun 2017 - May 2019',
    'Summer Undergraduate Research Award (SURA-2017)',
    'Published: Temperature and time dependent morphological evolution of copper oxide nanostructures (Springer, 2024)',
  ],
  bio: `I'm a Full Stack Developer with a strong backend focus, currently at Quizizz, Bangalore. With 6+ years of experience building scalable systems across fintech, edtech, and AI-powered platforms, I've worked at Goldman Sachs, MindTickle, and PhotonInsights before my current role.

I hold a B.Tech from IIT Roorkee and carry certifications in cybersecurity (Security+, CEH v11). I'm passionate about system design, performance optimization, and building products that serve millions of users.

When I'm not coding, you'll find me exploring cybersecurity challenges on HackTheBox or playing table tennis.`,
};

export const EXPERIENCES: Experience[] = [
  {
    company: 'Quizizz',
    role: 'Full Stack Developer (BE Heavy)',
    location: 'Bangalore',
    period: 'November 2024 - Present',
    highlights: [
      'Leading the Lessons and Content team back-end as an IC.',
      'Revamped authentication flow with end-to-end reusable refresh tokens for 300K+ DAU across U.S. school platforms.',
      'Optimized Node.js APIs, reducing P99 response times to meet <800ms SLA.',
      'Built content import flow for Google Drive and OneDrive integration.',
      'Implemented AI-driven parameterized quiz generation, reducing user interaction steps by 40%.',
    ],
    techStack: ['AWS', 'Docker', 'Angular', 'Node.JS', 'GO', 'Python', 'OpenAI', 'ECS', 'MongoDB'],
  },
  {
    company: 'PhotonInsights',
    role: 'Software Architect',
    location: 'Remote',
    period: 'August 2022 - October 2024',
    highlights: [
      'Led a backend and infrastructure team of 4, driving scalable system development.',
      'Generated Level 1 diligence reports for asset management institutions.',
      'Integrated Slack and Microsoft Teams for live queries, reducing search time from 2-3 weeks to <1 hour.',
      'Integrated Microsoft OpenAI LLM with vector databases, reducing query time from minutes to <5 seconds.',
    ],
    techStack: ['AWS', 'Docker', 'React', 'Python', 'OpenAI', 'ECS', 'Scala', 'Java', 'MySQL', 'Postgres', 'MongoDB'],
  },
  {
    company: 'MindTickle',
    role: 'Full-Stack Developer',
    location: 'Pune',
    period: 'August 2021 - August 2022',
    highlights: [
      'Led design and implementation of sales-enablement solutions with a team of 2 interns.',
      'Maintained terabytes of data, optimizing high data writes from hours to <30 minutes.',
    ],
    techStack: ['AWS', 'Docker', 'ECS', 'Scala', 'Scala-Spark', 'Java', 'Python', 'PySpark', 'MySQL', 'Postgres', 'MongoDB'],
  },
  {
    company: 'Goldman Sachs',
    role: 'Analyst - Global Markets Division',
    location: 'Bangalore',
    period: 'July 2019 - July 2021',
    highlights: [
      'Led migration of legacy monolith to micro-service architecture with CI/CD.',
      'Solved business problems including duplicate trade data prevention, rebates and commission calculation.',
    ],
    techStack: ['Java', 'MySQL', 'Postgres'],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Omniplex',
    description: 'Open-source Perplexity alternative — AI-powered search and answer engine with real-time web access and intelligent summarization.',
    tech: ['TypeScript', 'Next.js', 'AI/LLM', 'Web Search'],
    github: 'https://github.com/tchandrakar/omniplex',
  },
  {
    name: 'Tiny GPU',
    description: 'A minimal GPU design in Verilog to learn how GPUs work from the ground up — exploring parallel computing architecture at the hardware level.',
    tech: ['SystemVerilog', 'Hardware Design', 'GPU Architecture'],
    github: 'https://github.com/tchandrakar/tiny-gpu',
  },
  {
    name: 'Nakama CLI Suite',
    description: 'A command-line tool suite built in Rust for efficient workflow automation and developer productivity.',
    tech: ['Rust', 'CLI', 'Systems Programming'],
    github: 'https://github.com/tchandrakar/nakama-cli-suite',
  },
  {
    name: 'Portfolio (This Site)',
    description: 'Kali Linux themed interactive desktop portfolio built with React and TypeScript, simulating a full Linux desktop experience.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/tchandrakar/tishant-portfolio',
  },
];

export const SKILLS: Skill[] = [
  {
    category: 'Languages',
    items: [
      { name: 'Java', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'TypeScript/JS', level: 90 },
      { name: 'Go', level: 80 },
      { name: 'Scala', level: 80 },
      { name: 'Rust', level: 65 },
    ],
  },
  {
    category: 'Backend & Frameworks',
    items: [
      { name: 'Node.js', level: 92 },
      { name: 'Spring Boot', level: 85 },
      { name: 'React', level: 85 },
      { name: 'Angular', level: 80 },
      { name: 'Scala-Spark', level: 75 },
      { name: 'PySpark', level: 75 },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      { name: 'AWS (ECS/EC2/S3)', level: 90 },
      { name: 'Docker', level: 90 },
      { name: 'CI/CD', level: 85 },
      { name: 'Microservices', level: 90 },
      { name: 'System Design', level: 88 },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'Vector DBs', level: 75 },
    ],
  },
  {
    category: 'AI & Security',
    items: [
      { name: 'OpenAI/LLMs', level: 82 },
      { name: 'Prompt Engineering', level: 80 },
      { name: 'Penetration Testing', level: 70 },
      { name: 'Network Security', level: 72 },
    ],
  },
];

export const BOOT_MESSAGES = [
  '[    0.000000] Booting TishantOS GNU/Linux...',
  '[    0.012451] Kernel version 6.4.2-kali-amd64',
  '[    0.025023] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1',
  '[    0.064512] CPU: Intel(R) Core(TM) i9-13900K @ 5.80GHz',
  '[    0.128023] Memory: 32768MB DDR5 available',
  '[    0.192045] ACPI: RSDP 0x00000000000E0000',
  '[    0.256067] PCI: Using configuration type 1 for base access',
  '[    0.384090] Loading kernel modules...',
  '[    0.448112] [drm] Initialized nvidia 545.29.06',
  '[    0.512134] USB subsystem initialized',
  '[    0.640156] NET: Registered protocol family 2',
  '[    0.768178] TCP/IP networking initialized',
  '[    0.896201] Loading portfolio modules...',
  '[    1.024223] [portfolio] experience.ko loaded — 6+ years indexed',
  '[    1.152245] [portfolio] skills.ko loaded — 25 technologies catalogued',
  '[    1.280267] [portfolio] projects.ko loaded — 4 repositories synced',
  '[    1.408289] [portfolio] certifications.ko loaded — Security+ | CEH | Network+',
  '[    1.536312] Initializing display manager...',
  '[    1.664334] Starting GDM (GNOME Display Manager)...',
  '[    1.792356] [gdm] Session: kali-xfce',
  '[    2.048400] System ready. Welcome to TishantOS.',
];

export const NEOFETCH = `
\x1b[36m          ....            \x1b[0m   \x1b[36mtishant\x1b[0m@\x1b[36mkali\x1b[0m
\x1b[36m       .;lxxkOO0l.       \x1b[0m   ──────────────────
\x1b[36m     .xK0kxxddddx0x,    \x1b[0m   \x1b[36mOS:\x1b[0m     TishantOS (Kali-based)
\x1b[36m    :KKxddxkkkxxdddx0:  \x1b[0m   \x1b[36mHost:\x1b[0m   Bangalore, India
\x1b[36m   dKxddO0OOO00Okxddx0; \x1b[0m   \x1b[36mKernel:\x1b[0m IIT Roorkee B.Tech
\x1b[36m  dXxddO0KKK00OOOkxddOK \x1b[0m   \x1b[36mUptime:\x1b[0m 6+ years in industry
\x1b[36m  OXkxxO0KXXKK00Okxdx0X;\x1b[0m   \x1b[36mRole:\x1b[0m   Full Stack Dev @ Quizizz
\x1b[36m  kXOxxk0KXXXXK0OkxxOKX:\x1b[0m   \x1b[36mDE:\x1b[0m     Node.js + Go + Python
\x1b[36m  ;KX0kxkO0KKK0OkkO0KXK \x1b[0m   \x1b[36mWM:\x1b[0m     AWS + Docker + ECS
\x1b[36m   lKXK0kxxkkkkxk0KXKx  \x1b[0m   \x1b[36mTheme:\x1b[0m  Kali-Dark [GTK3]
\x1b[36m    :0XXKK00000KKXXKl   \x1b[0m   \x1b[36mTerminal:\x1b[0m react-portfolio v1.0
\x1b[36m      lkKXXXXXXXKkl     \x1b[0m   \x1b[36mShell:\x1b[0m  bash 5.2.15
\x1b[36m        ,;;::;;,.       \x1b[0m   \x1b[36mCPU:\x1b[0m    Goldman|MindTickle|Photon|Quizizz
\x1b[36m                        \x1b[0m   \x1b[36mGPU:\x1b[0m    React + Angular + TypeScript
\x1b[36m                        \x1b[0m   \x1b[36mMemory:\x1b[0m  MongoDB | Postgres | MySQL
`;

export const NEOFETCH_PLAIN = [
  { art: '          ....            ', info: 'tishant@kali' },
  { art: '       .;lxxkOO0l.       ', info: '──────────────────' },
  { art: '     .xK0kxxddddx0x,    ', info: 'OS:       TishantOS (Kali-based)' },
  { art: '    :KKxddxkkkxxdddx0:  ', info: 'Host:     Bangalore, India' },
  { art: '   dKxddO0OOO00Okxddx0; ', info: 'Kernel:   IIT Roorkee B.Tech' },
  { art: '  dXxddO0KKK00OOOkxddOK ', info: 'Uptime:   6+ years in industry' },
  { art: '  OXkxxO0KXXKK00Okxdx0X;', info: 'Role:     Full Stack Dev @ Quizizz' },
  { art: '  kXOxxk0KXXXXK0OkxxOKX:', info: 'DE:       Node.js + Go + Python' },
  { art: '  ;KX0kxkO0KKK0OkkO0KXK ', info: 'WM:       AWS + Docker + ECS' },
  { art: '   lKXK0kxxkkkkxk0KXKx  ', info: 'Theme:    Kali-Dark [GTK3]' },
  { art: '    :0XXKK00000KKXXKl   ', info: 'Terminal: react-portfolio v1.0' },
  { art: '      lkKXXXXXXXKkl     ', info: 'Shell:    bash 5.2.15' },
  { art: '        ,;;::;;,.       ', info: 'CPU:      Goldman|MindTickle|Photon|Quizizz' },
  { art: '                        ', info: 'GPU:      React + Angular + TypeScript' },
  { art: '                        ', info: 'Memory:   MongoDB | Postgres | MySQL' },
];
