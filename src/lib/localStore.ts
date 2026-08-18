import fs from 'fs';
import path from 'path';

const localDbPath = path.resolve(process.cwd(), 'src/lib/localData.json');

// Default initial data matching fallbackData
const initialData = {
  projects: [
    {
      _id: 'proj_1',
      title: 'Epic Computer',
      description: 'E-commerce web application for a computer hardware business, enabling online and in-store purchases. Features AI chatbot support, user management, product management, order & billing management, and showroom billing system.',
      date: 'December 2025',
      techStack: ['MERN Stack'],
      order: 0
    },
    {
      _id: 'proj_2',
      title: 'Handicraft Marketplace',
      description: 'Web application for a live business enabling customers to browse and purchase handicrafts online. Developed customer feedback & ticketing management system with integrated chatbot support.',
      date: 'July 2025 - November 2025',
      techStack: ['MERN Stack'],
      order: 1
    },
    {
      _id: 'proj_3',
      title: 'Simple Way Transport',
      description: 'Online transport system for booking and managing rides. Developed comprehensive user management module handling authentication, profiles, and role-based access control.',
      date: 'February 2025 - June 2025',
      techStack: ['Java', 'JSP/Servlets', 'MySQL'],
      order: 2
    },
    {
      _id: 'proj_4',
      title: 'Vehicle Insurance System',
      description: 'Web application for managing insurance packages, policies, and claims. Built user management system with secure authentication and profile management capabilities.',
      date: 'July 2024 - December 2024',
      techStack: ['PHP', 'MySQL', 'XAMPP'],
      order: 3
    },
    {
      _id: 'proj_5',
      title: 'Wellness Mobile App',
      description: 'Mobile application promoting personal wellness and daily health routines. Features include daily habit tracker, hydration reminder, mood journal with emoji selector, and mood trend chart visualization.',
      date: 'Personal Project',
      techStack: ['Kotlin', 'Android Studio'],
      order: 4
    }
  ],
  skills: [
    { _id: 's_1', name: 'Java', category: 'Programming Languages', order: 0 },
    { _id: 's_2', name: 'Python', category: 'Programming Languages', order: 1 },
    { _id: 's_3', name: 'JavaScript', category: 'Programming Languages', order: 2 },
    { _id: 's_4', name: 'C', category: 'Programming Languages', order: 3 },
    { _id: 's_5', name: 'C++', category: 'Programming Languages', order: 4 },
    { _id: 's_6', name: 'Kotlin', category: 'Programming Languages', order: 5 },
    { _id: 's_7', name: 'PHP', category: 'Programming Languages', order: 6 },
    { _id: 's_8', name: 'HTML5', category: 'Web Technologies', order: 0 },
    { _id: 's_9', name: 'CSS3', category: 'Web Technologies', order: 1 },
    { _id: 's_10', name: 'React.js', category: 'Web Technologies', order: 2 },
    { _id: 's_11', name: 'Node.js', category: 'Web Technologies', order: 3 },
    { _id: 's_12', name: 'Express.js', category: 'Web Technologies', order: 4 },
    { _id: 's_13', name: 'JSP/Servlets', category: 'Web Technologies', order: 5 },
    { _id: 's_14', name: 'MongoDB', category: 'Databases & Tools', order: 0 },
    { _id: 's_15', name: 'MySQL', category: 'Databases & Tools', order: 1 },
    { _id: 's_16', name: 'SQL Server', category: 'Databases & Tools', order: 2 },
    { _id: 's_17', name: 'Git & GitHub', category: 'Databases & Tools', order: 3 },
    { _id: 's_18', name: 'Figma', category: 'Databases & Tools', order: 4 },
    { _id: 's_19', name: 'VS Code', category: 'Databases & Tools', order: 5 },
    { _id: 's_20', name: 'Android Studio', category: 'Databases & Tools', order: 6 },
    { _id: 's_21', name: 'Postman', category: 'Databases & Tools', order: 7 },
    { _id: 's_22', name: 'Jira', category: 'Databases & Tools', order: 8 },
    { _id: 's_23', name: 'MERN Stack', category: 'Concepts & Frameworks', order: 0 },
    { _id: 's_24', name: 'OOP', category: 'Concepts & Frameworks', order: 1 },
    { _id: 's_25', name: 'MVC Architecture', category: 'Concepts & Frameworks', order: 2 },
    { _id: 's_26', name: 'SDLC', category: 'Concepts & Frameworks', order: 3 },
    { _id: 's_27', name: 'Computer Networks', category: 'Concepts & Frameworks', order: 4 },
    { _id: 's_28', name: 'AI/ML', category: 'Concepts & Frameworks', order: 5 }
  ],
  experience: [
    {
      _id: 'exp_1',
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
    {
      _id: 'exp_2',
      role: 'Bachelor of Science (Hons.) in Information Technology',
      company: 'Sri Lanka Institute of Information Technology',
      period: '2023 - 2027',
      description: 'Specializing in Information Technology with focus on software development, AI/ML, and full-stack web development.',
      type: 'education',
      order: 0
    },
    {
      _id: 'exp_3',
      role: 'G.C.E. Advanced Level Examination',
      company: 'Sri Subhuthi National School',
      period: '2021',
      description: 'Science For Technology - B | ICT - C | Engineering Technology - C',
      type: 'education',
      order: 1
    }
  ],
  certificates: [
    {
      _id: 'c_1',
      title: 'Python Programming Certificate',
      organization: 'University of Moratuwa',
      year: '2026',
      imageKey: 'python',
      description: 'Comprehensive training in Python programming language fundamentals, control structures, object-oriented concepts, and basic data structures.',
      status: 'Finished'
    },
    {
      _id: 'c_2',
      title: 'Machine Learning using Python',
      organization: 'Simplilearn',
      year: '2026',
      imageKey: 'ml',
      description: 'Practical training on supervised and unsupervised learning, regression analysis, clustering models, decision trees, and validation techniques.',
      status: 'Finished'
    },
    {
      _id: 'c_3',
      title: 'AI/ML Engineer Stage 1',
      organization: 'SLIIT',
      year: '2026',
      imageKey: 'aiml',
      description: 'Core fundamentals of AI and ML engineering, exploring neural networks, algorithms, and practical applications in deep learning.',
      status: 'Finished'
    },
    {
      _id: 'c_4',
      title: 'Cyber Security Essentials',
      organization: 'VTA',
      year: '2018',
      imageKey: 'cyber',
      description: 'Essential security structures, covering system protection protocols, network defenses, threat risk assessments, and firewall maintenance.',
      status: 'Finished'
    },
    {
      _id: 'c_5',
      title: 'IT Essentials',
      organization: 'VTA',
      year: '2018',
      imageKey: 'it',
      description: 'Fundamental computer hardware setups, operating systems configurations, basic networking wiring, and computer maintenance practices.',
      status: 'Finished'
    },
    {
      _id: 'c_6',
      title: 'Computer Based Application',
      organization: 'VTA',
      year: '2018',
      imageKey: 'cba',
      description: 'Comprehensive workflow software operations including databases structures, data spreadsheets, word processors, and document automation.',
      status: 'Finished'
    }
  ],
  messages: []
};

// Initialize file if not exists
export function initLocalStore() {
  if (!fs.existsSync(localDbPath)) {
    fs.writeFileSync(localDbPath, JSON.stringify(initialData, null, 2), 'utf8');
  } else {
    // Upgrade existing file to include status fields on certificates if missing
    try {
      const raw = fs.readFileSync(localDbPath, 'utf8');
      const parsed = JSON.parse(raw);
      let changed = false;
      if (parsed.certificates && Array.isArray(parsed.certificates)) {
        parsed.certificates.forEach((c: any) => {
          if (!c.status) {
            c.status = 'Finished';
            changed = true;
          }
        });
      }
      if (changed) {
        fs.writeFileSync(localDbPath, JSON.stringify(parsed, null, 2), 'utf8');
      }
    } catch (err) {
      console.error('Failed to upgrade localData.json:', err);
    }
  }
}

export function readLocalData(key: string): any[] {
  try {
    initLocalStore();
    const raw = fs.readFileSync(localDbPath, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed[key] || [];
  } catch (err) {
    console.error('Failed to read local data:', err);
    return [];
  }
}

export function writeLocalData(key: string, data: any[]): void {
  try {
    initLocalStore();
    const raw = fs.readFileSync(localDbPath, 'utf8');
    const parsed = JSON.parse(raw);
    parsed[key] = data;
    fs.writeFileSync(localDbPath, JSON.stringify(parsed, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write local data:', err);
  }
}
