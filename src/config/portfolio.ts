export const profile = {
  name: "Shanmukh Tharun",
  status: "Final Year Computer Science Engineering Student",
  headline: "Full Stack Developer · Competitive Programmer · Software Engineering Enthusiast",
  summary:
    "Building modern full-stack applications with React and Node.js while solving complex algorithmic problems through competitive programming.",
  university: "Aditya University",
  degree: "B.Tech, Computer Science Engineering",
};

export const links = {
  github: "https://github.com/Shannu-King",
  linkedin: "https://www.linkedin.com/in/shanmukh-tharun-69a063291/",
  email: "mailto:tarunturpudi@gmail.com",
  resume: "/resume.pdf",
  leetcode: "https://leetcode.com/u/shanmukhtharun/",
  codechef: "https://www.codechef.com/users/shanmukh_king",
  portfolio: "https://example.com",
  certifications: {
    mongodb: "https://drive.google.com/file/d/1JL_8wst4NR_oeGONcKib-WHsoqsPx_3k/view?usp=sharing",
    oracleJava: "https://drive.google.com/file/d/1Db-E6IUW-_j8Wi1aVHpX0iF1OIt7fSmV/view?usp=sharing",
    javascript: "https://drive.google.com/file/d/1xUJJ8cN7_9UvBr4UL8yXaFBqzxuIdnni/view?usp=sharing",
    python: "https://drive.google.com/file/d/1qol6fj8I8ij2Nk2srTwBixpCVFPeIuSc/view?usp=sharing",
    cpp: "https://drive.google.com/file/d/1QTGVzJJCf772I8UgI8xKDpvv8IHBtou7/view?usp=sharing",
    c: "https://drive.google.com/file/d/1xiX3vDPrn1pGtYa-KKzOSBfj1o3IpDWN/view?usp=sharing",
  },
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: links.resume },
];

export const highlights = [
  { icon: "🏆", title: "Knight Badge", subtitle: "LeetCode" },
  { icon: "🌍", title: "Top 6%", subtitle: "LeetCode Global Ranking" },
  { icon: "💯", title: "600+", subtitle: "Problems Solved" },
  { icon: "⭐", title: "2★", subtitle: "CodeChef Programmer" },
  { icon: "📜", title: "6", subtitle: "Professional Certifications" },
  { icon: "💻", title: "Full Stack", subtitle: "Developer" },
];

export const skillCategories = [
  { icon: "💻", title: "Programming Languages", experience: "Core", items: ["C++", "Java", "Python", "JavaScript", "C"] },
  { icon: "🎨", title: "Frontend Development", experience: "5 Projects", items: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "Bootstrap"] },
  { icon: "⚙️", title: "Backend Development", experience: "3 REST APIs", items: ["Node.js", "Express.js", "REST APIs", "JWT"] },
  { icon: "🗄️", title: "Databases", experience: "4 Projects", items: ["MySQL", "MongoDB", "Supabase"] },
  { icon: "🛠️", title: "Developer Tools", experience: "Daily Use", items: ["Git", "GitHub", "VS Code", "Linux", "Postman", "Vite"] },
  { icon: "📚", title: "Computer Science", experience: "Academic", items: ["Operating Systems", "DBMS", "Computer Networks", "OOP"] },
  { icon: "🚀", title: "Currently Learning", experience: "In Progress", items: ["System Design", "Docker", "Cloud Computing"] },
];

export type Certification = {
  name: string;
  org: string;
  skills: string[];
  date: string;
  credentialId: string;
  link: string;
};

export const certifications: Certification[] = [
  {
    name: "MongoDB Associate Developer",
    org: "MongoDB University",
    date: "May 2026",
    credentialId: "MDB-123456",
    skills: ["Aggregation Framework", "CRUD Operations", "MongoDB Atlas", "Schema Design"],
    link: links.certifications.mongodb,
  },
  {
    name: "Oracle Certified Associate, Java SE",
    org: "Oracle",
    date: "March 2026",
    credentialId: "ORC-987654",
    skills: ["Core Java", "OOP", "Collections", "Exception Handling"],
    link: links.certifications.oracleJava,
  },
  {
    name: "C++ Certified Associate Programmer",
    org: "Cisco",
    date: "Jan 2026",
    credentialId: "CPA-789012",
    skills: ["STL", "OOP", "Memory Management"],
    link: links.certifications.cpp,
  },
  {
    name: "JavaScript Essentials",
    org: "Cisco",
    date: "Feb 2026",
    credentialId: "JSE-345678",
    skills: ["ES6+", "DOM", "APIs", "Async Programming"],
    link: links.certifications.javascript,
  },
  {
    name: "Certified Associate in Python",
    org: "Red Hat Academy",
    date: "Dec 2025",
    credentialId: "PCAP-901234",
    skills: ["Python Fundamentals", "OOP", "Libraries"],
    link: links.certifications.python,
  },
  {
    name: "C Programming Certified Associate",
    org: "Cisco",
    date: "Nov 2025",
    credentialId: "CLA-567890",
    skills: ["Pointers", "Functions", "Arrays", "Memory Management"],
    link: links.certifications.c,
  },
];

export type Project = {
  title: string;
  description: string;
  problem: string;
  features: string[];
  stack: string[];
  challenges: string[];
  learnings: string[];
  future: string[];
  github?: string;
  demo?: string;
  stats: { label: string; value: string }[];
  architecture?: string[];
  isMaintenance?: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Pecup.in",
    description:
      "An all-in-one platform for students featuring class materials, previous model exam papers, assignments, and solutions with social sharing capabilities.",
    problem: "Students struggle to find structured class materials and previous year papers scattered across different platforms.",
    features: ["Student Login", "Class Materials", "Model Exam Papers", "Assignment Solutions", "Social Media Sharing"],
    stack: ["Next.js", "TSX", "React", "Supabase"],
    challenges: ["Organizing a vast amount of educational resources.", "Implementing secure authentication and smooth sharing functionality."],
    learnings: ["Building a resource-heavy platform.", "Handling authentication and user sessions with Supabase."],
    future: ["Community Forums", "Live Chat", "Automated Grading"],
    github: "https://github.com/yswnthm/pecup-dead",
    demo: "https://pecup.in",
    stats: [
      { label: "Resources", value: "100+" },
      { label: "Users", value: "Active" },
      { label: "Type", value: "Full Stack" },
    ],
    architecture: ["Frontend (TSX/React)", "Backend (Next.js)", "Database & Auth (Supabase)"],
    image: "/pecup_dashboard.png",
  },
  {
    title: "Krida Verse",
    description:
      "A modern web platform for managing university sports events digitally — fixtures, registrations, results, and live schedules in one place.",
    problem:
      "Universities still rely on spreadsheets and paper rosters to run multi-day tournaments. This platform replaces that with a centralized digital workflow.",
    features: [
      "Student Portal",
      "Admin Dashboard",
      "Tournament Registration",
      "Fixture Management",
      "Results Management",
      "Notifications",
      "Schedules",
    ],
    stack: ["React", "Node.js", "Express.js", "MySQL", "REST API"],
    challenges: [
      "Designing a scheduling algorithm that avoids fixture conflicts across venues.",
      "Modeling relational data for teams, players, matches and results without redundancy.",
      "Keeping admin and student UIs in sync without over-fetching.",
    ],
    learnings: [
      "Component-driven architecture and shared design tokens.",
      "Designing REST contracts before writing handlers.",
      "Pragmatic state management with derived data.",
    ],
    future: ["Auth + role-based access", "Live score updates over WebSockets", "Cloud deployment with CI"],
    github: "https://github.com/VinayakaGopalaKrishnA123/AthleteX",
    demo: "https://github.com/VinayakaGopalaKrishnA123/AthleteX",
    isMaintenance: true,
    stats: [
      { label: "Modules", value: "7" },
      { label: "API Endpoints", value: "20+" },
      { label: "Tech Used", value: "5" },
    ],
    architecture: ["Frontend (React)", "API Layer (REST)", "Backend (Node.js/Express)", "Database (MySQL)"],
    image: "/krida_verse.jpg",
  },
  {
    title: "SGPA Calculator",
    description:
      "A pure client-side responsive GPA calculator that helps students compute semester performance instantly and securely without storing personal data on external servers.",
    problem: "Manual SGPA calculation is slow and error-prone. Students also prefer a lightweight solution without needing accounts or databases.",
    features: ["Responsive UI", "Local Storage Data Passing", "Instant Calculation", "PDF Results Export", "Privacy-focused"],
    stack: ["HTML", "CSS", "JavaScript"],
    challenges: [
      "Passing calculated data between multiple pages seamlessly using only Local Storage.",
      "Ensuring accurate calculations and a smooth user experience without relying on a backend.",
    ],
    learnings: ["DOM APIs", "LocalStorage for state management", "Form validation"],
    future: ["PWA Support", "Dark Mode", "Performance Analytics"],
    github: "https://github.com/Shannu-King/Shannu-Sgpa-Contribution",
    demo: "https://shannu-king.github.io/Shannu-Sgpa-Contribution/",
    stats: [
      { label: "Architecture", value: "Client-side" },
      { label: "APIs Used", value: "0" },
      { label: "Deps", value: "0" },
    ],
    architecture: ["Frontend (HTML/CSS/JS)", "Local Storage (State)"],
    image: "/sgpa_calculator.png",
  },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    stats: [
      { label: "Max Rating", value: "1853" },
      { label: "Badge", value: "Knight" },
      { label: "Solved", value: "600+" },
      { label: "Global Rank", value: "Top 6%" },
    ],
    link: links.leetcode,
  },
  {
    platform: "CodeChef",
    stats: [
      { label: "Rating", value: "2★ Coder" },
      { label: "Max Rating", value: "1550" },
      { label: "Contests", value: "50+" },
    ],
    link: links.codechef,
  },
];

export const dsaTopics = [
  { topic: "Arrays", count: 120 },
  { topic: "STL", count: 90 },
  { topic: "Hashing", count: 80 },
  { topic: "Binary Search", count: 70 },
  { topic: "Sliding Window", count: 60 },
  { topic: "Greedy", count: 55 },
  { topic: "Dynamic Programming", count: 50 },
  { topic: "Trees", count: 45 },
  { topic: "Graphs", count: 40 },
  { topic: "Backtracking", count: 35 },
];

export const achievements = [
  { icon: "🏆", title: "Knight Badge on LeetCode", desc: "Earned by sustained contest performance." },
  { icon: "🌍", title: "Top 6% Global Ranking", desc: "Among millions of LeetCode users worldwide." },
  { icon: "💯", title: "600+ Problems Solved", desc: "Across DSA, contests and patterns." },
  { icon: "⭐", title: "CodeChef Rating: 1550", desc: "Just 50 points shy of achieving 3★ status." },
  { icon: "🌟", title: "GeeksforGeeks Campus Mantri", desc: "Led campus tech initiatives and acted as a brand ambassador (Jan - Jun 2026)." },
  { icon: "📜", title: "6 Professional Certifications", desc: "Across databases, languages and platforms." },
  { icon: "🎓", title: "Final Year CSE Student", desc: "Aditya University — engineering-focused curriculum." },
];

export const coursework = [
  "Data Structures",
  "Algorithms",
  "Operating Systems",
  "Database Management Systems",
  "Computer Networks",
  "Machine Learning",
  "Cloud Computing",
  "Software Engineering",
  "Object-Oriented Programming",
];

export const journey = [
  {
    year: "2023",
    title: "Started Programming",
    desc: "Began my journey with C and C++, learning programming fundamentals, memory management, STL, and object-oriented programming.",
  },
  {
    year: "2024",
    title: "Competitive Programming",
    desc: "Started solving problems on LeetCode and CodeChef, building strong algorithmic and data structure fundamentals.",
  },
  {
    year: "2025",
    title: "Consistency Pays Off",
    desc: "Solved 600+ coding problems and expanded into Full-Stack Development using React, Node.js, Express, MySQL, and TypeScript.",
  },
  {
    year: "2025",
    title: "Built Krida Verse",
    desc: "Developed a university sports management platform with registrations, fixtures, and live updates.",
  },
  {
    year: "2026",
    title: "Built PEC.UP",
    desc: "Built a full-stack academic resource platform used by 540+ students, providing study materials, previous papers, assignments, and authentication.",
  },
  {
    year: "2026",
    title: "Knight Badge",
    desc: "Achieved the Knight Badge on LeetCode through consistent contest performance and reached a maximum rating of 1853.",
  },
  {
    year: "2026",
    title: "Current Focus",
    desc: "Learning System Design, backend architecture, scalability, and preparing for Software Development Engineer (SDE) roles.",
  },
];

