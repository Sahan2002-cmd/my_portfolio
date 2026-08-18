export const skillsData = [
  // Programming Languages
  { name: 'Java', category: 'Programming Languages', order: 0 },
  { name: 'Python', category: 'Programming Languages', order: 1 },
  { name: 'JavaScript', category: 'Programming Languages', order: 2 },
  { name: 'C', category: 'Programming Languages', order: 3 },
  { name: 'C++', category: 'Programming Languages', order: 4 },
  { name: 'Kotlin', category: 'Programming Languages', order: 5 },
  { name: 'PHP', category: 'Programming Languages', order: 6 },
  
  // Web Technologies
  { name: 'HTML5', category: 'Web Technologies', order: 0 },
  { name: 'CSS3', category: 'Web Technologies', order: 1 },
  { name: 'React.js', category: 'Web Technologies', order: 2 },
  { name: 'Node.js', category: 'Web Technologies', order: 3 },
  { name: 'Express.js', category: 'Web Technologies', order: 4 },
  { name: 'JSP/Servlets', category: 'Web Technologies', order: 5 },

  // Databases & Tools
  { name: 'MongoDB', category: 'Databases & Tools', order: 0 },
  { name: 'MySQL', category: 'Databases & Tools', order: 1 },
  { name: 'SQL Server', category: 'Databases & Tools', order: 2 },
  { name: 'Git & GitHub', category: 'Databases & Tools', order: 3 },
  { name: 'Figma', category: 'Databases & Tools', order: 4 },
  { name: 'VS Code', category: 'Databases & Tools', order: 5 },
  { name: 'Android Studio', category: 'Databases & Tools', order: 6 },
  { name: 'Postman', category: 'Databases & Tools', order: 7 },
  { name: 'Jira', category: 'Databases & Tools', order: 8 },

  // Concepts & Frameworks
  { name: 'MERN Stack', category: 'Concepts & Frameworks', order: 0 },
  { name: 'OOP', category: 'Concepts & Frameworks', order: 1 },
  { name: 'MVC Architecture', category: 'Concepts & Frameworks', order: 2 },
  { name: 'SDLC', category: 'Concepts & Frameworks', order: 3 },
  { name: 'Computer Networks', category: 'Concepts & Frameworks', order: 4 },
  { name: 'AI/ML', category: 'Concepts & Frameworks', order: 5 }
];

export const experiencesData = [
  // Work Experience
  {
    role: 'Training Bank Associate',
    company: 'Peoples Bank Battaramulla',
    period: 'September 2022 - September 2023',
    description: 'Managed cash deposits, withdrawals, passbook services, cheque processing, account operations, and debit card issuance. Developed strong attention to detail and customer service skills in a professional banking environment.',
    type: 'work',
    order: 0,
    attachment: '/assets/documents/service_letter.pdf',
    attachmentType: 'pdf',
    attachmentName: 'Service Letter - Peoples Bank.pdf'
  },
  // Education
  {
    role: 'Bachelor of Science (Hons.) in Information Technology',
    company: 'Sri Lanka Institute of Information Technology',
    period: '2023 - 2027',
    description: 'Specializing in Information Technology with focus on software development, AI/ML, and full-stack web development.',
    type: 'education',
    order: 0
  },
  {
    role: 'G.C.E. Advanced Level Examination',
    company: 'Sri Subhuthi National School',
    period: '2021',
    description: 'Science For Technology - B | ICT - C | Engineering Technology - C',
    type: 'education',
    order: 1
  }
];

export const projectsData = [
  {
    title: 'Epic Computer',
    description: 'E-commerce web application for a computer hardware business, enabling online and in-store purchases. Features AI chatbot support, user management, product management, order & billing management, and showroom billing system.',
    date: 'December 2025',
    techStack: ['MERN Stack'],
    order: 0
  },
  {
    title: 'Handicraft Marketplace',
    description: 'Web application for a live business enabling customers to browse and purchase handicrafts online. Developed customer feedback & ticketing management system with integrated chatbot support.',
    date: 'July 2025 - November 2025',
    techStack: ['MERN Stack'],
    order: 1
  },
  {
    title: 'Simple Way Transport',
    description: 'Online transport system for booking and managing rides. Developed comprehensive user management module handling authentication, profiles, and role-based access control.',
    date: 'February 2025 - June 2025',
    techStack: ['Java', 'JSP/Servlets', 'MySQL'],
    order: 2
  },
  {
    title: 'Vehicle Insurance System',
    description: 'Web application for managing insurance packages, policies, and claims. Built user management system with secure authentication and profile management capabilities.',
    date: 'July 2024 - December 2024',
    techStack: ['PHP', 'MySQL', 'XAMPP'],
    order: 3
  },
  {
    title: 'Wellness Mobile App',
    description: 'Mobile application promoting personal wellness and daily health routines. Features include daily habit tracker, hydration reminder, mood journal with emoji selector, and mood trend chart visualization.',
    date: 'Personal Project',
    techStack: ['Kotlin', 'Android Studio'],
    order: 4
  }
];

export const certificatesData = [
  {
    title: 'Python Programming Certificate',
    organization: 'University of Moratuwa',
    year: '2026',
    imageKey: 'python',
    description: 'Comprehensive training in Python programming language fundamentals, control structures, object-oriented concepts, and basic data structures.'
  },
  {
    title: 'Machine Learning using Python',
    organization: 'Simplilearn',
    year: '2026',
    imageKey: 'ml',
    description: 'Practical training on supervised and unsupervised learning, regression analysis, clustering models, decision trees, and validation techniques.'
  },
  {
    title: 'AI/ML Engineer Stage 1',
    organization: 'SLIIT',
    year: '2026',
    imageKey: 'aiml',
    description: 'Core fundamentals of AI and ML engineering, exploring neural networks, algorithms, and practical applications in deep learning.'
  },
  {
    title: 'Cyber Security Essentials',
    organization: 'VTA',
    year: '2018',
    imageKey: 'cyber',
    description: 'Essential security structures, covering system protection protocols, network defenses, threat risk assessments, and firewall maintenance.'
  },
  {
    title: 'IT Essentials',
    organization: 'VTA',
    year: '2018',
    imageKey: 'it',
    description: 'Fundamental computer hardware setups, operating systems configurations, basic networking wiring, and computer maintenance practices.'
  },
  {
    title: 'Computer Based Application',
    organization: 'VTA',
    year: '2018',
    imageKey: 'cba',
    description: 'Comprehensive workflow software operations including databases structures, data spreadsheets, word processors, and document automation.'
  }
];
