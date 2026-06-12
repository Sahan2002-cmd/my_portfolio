'use client';

import { useSelector } from 'react-redux';
import { Code2, Globe, Database, Cpu } from 'lucide-react';

const defaultSkills = [
  // Programming Languages
  { name: 'Java', category: 'Programming Languages' },
  { name: 'Python', category: 'Programming Languages' },
  { name: 'JavaScript', category: 'Programming Languages' },
  { name: 'C', category: 'Programming Languages' },
  { name: 'C++', category: 'Programming Languages' },
  { name: 'Kotlin', category: 'Programming Languages' },
  { name: 'PHP', category: 'Programming Languages' },

  // Web Technologies
  { name: 'HTML5', category: 'Web Technologies' },
  { name: 'CSS3', category: 'Web Technologies' },
  { name: 'React.js', category: 'Web Technologies' },
  { name: 'Node.js', category: 'Web Technologies' },
  { name: 'Express.js', category: 'Web Technologies' },
  { name: 'JSP/Servlets', category: 'Web Technologies' },

  // Databases & Tools
  { name: 'MongoDB', category: 'Databases & Tools' },
  { name: 'MySQL', category: 'Databases & Tools' },
  { name: 'SQL Server', category: 'Databases & Tools' },
  { name: 'Git & GitHub', category: 'Databases & Tools' },
  { name: 'Figma', category: 'Databases & Tools' },
  { name: 'VS Code', category: 'Databases & Tools' },
  { name: 'Android Studio', category: 'Databases & Tools' },
  { name: 'Postman', category: 'Databases & Tools' },
  { name: 'Jira', category: 'Databases & Tools' },

  // Concepts & Frameworks
  { name: 'MERN Stack', category: 'Concepts & Frameworks' },
  { name: 'OOP', category: 'Concepts & Frameworks' },
  { name: 'MVC Architecture', category: 'Concepts & Frameworks' },
  { name: 'SDLC', category: 'Concepts & Frameworks' },
  { name: 'Computer Networks', category: 'Concepts & Frameworks' },
  { name: 'AI/ML', category: 'Concepts & Frameworks' },
];

const categories = [
  { name: 'Programming Languages', icon: Code2, color: 'text-cyan-400' },
  { name: 'Web Technologies', icon: Globe, color: 'text-teal-400' },
  { name: 'Databases & Tools', icon: Database, color: 'text-slate-400' },
  { name: 'Concepts & Frameworks', icon: Cpu, color: 'text-[#00f5ff]' },
];

export default function Skills() {
  const { skills } = useSelector((state: any) => state.portfolio);
  
  const activeSkills = skills && skills.length > 0 ? skills : defaultSkills;

  // Group skills by category
  const getSkillsByCategory = (categoryName: string) => {
    return activeSkills
      .filter((s: any) => s.category === categoryName)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 relative"
    >
      <div className="glass-card max-w-4xl w-full p-8 md:p-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
          <span className="bg-gradient-to-r from-[#00f5ff] to-[#14b8a6] bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const catSkills = getSkillsByCategory(cat.name);

            if (catSkills.length === 0) return null;

            return (
              <div
                key={cat.name}
                className="p-6 bg-white/3 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 bg-white/5 rounded-lg ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {catSkills.map((skill: any, idx: number) => (
                    <span
                      key={skill._id || idx}
                      className="skill-chip border hover:cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
