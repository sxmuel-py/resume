import React from 'react';
import { Shield, Code2, Layout, Server, ClipboardList, Star } from 'lucide-react';

const Skills = () => {
  const categories = [
    {
      icon: <Shield size={32} strokeWidth={1.5} />,
      title: "Security",
      pills: ["Identity Management", "Secure Authentication", "Vulnerability Assessment", "Security Auditing", "OSINT", "Network Security", "Burp Suite", "Identity Protection", "Access Control"]
    },
    {
      icon: <Code2 size={32} strokeWidth={1.5} />,
      title: "Languages",
      pills: ["Python", "TypeScript", "JavaScript", "Bash", "SQL", "HTML/CSS"]
    },
    {
      icon: <Layout size={32} strokeWidth={1.5} />,
      title: "Development",
      pills: ["Next.js", "React", "Node.js", "REST APIs", "Git", "Docker", "Database Design", "System Architecture"]
    },
    {
      icon: <Server size={32} strokeWidth={1.5} />,
      title: "Infrastructure",
      pills: ["Linux Administration", "Windows Server", "Active Directory", "Cloud Computing (AWS)", "M365 Management"]
    },
    {
      icon: <ClipboardList size={32} strokeWidth={1.5} />,
      title: "Operations",
      pills: ["ITIL Best Practices", "Helpdesk Management", "Agile Methodology", "DevSecOps", "Documentation"]
    },
    {
      icon: <Star size={32} strokeWidth={1.5} />,
      title: "Core Expertise",
      wide: true,
      pills: [
        "Infrastructure Support", "System Implementation", "Workflow Automation",
        "Security-First Development", "Technical Consulting", "Requirement Analysis",
        "Enterprise IT Solutions", "End-user Support"
      ]
    }
  ];

  return (
    <section id="skills" style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "120px 64px",
      transition: "background-color 0.5s ease"
    }}>
      <div className="sk-intro" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "40px",
        alignItems: "end",
        marginBottom: "80px"
      }}>
        <div>
          <div className="stag r">Capabilities</div>
          <h2 className="sh r">A comprehensive<br /><em>technical foundation.</em></h2>
        </div>
        <p className="sk-intro-r r" style={{
          fontSize: "18px",
          lineHeight: "1.6",
          color: "var(--text-muted)"
        }}>
          Specializing in the intersection of secure system architecture and high-performance software development, I deliver solutions that are both scalable and resilient.
        </p>
      </div>

      <div className="skgrid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px"
      }}>
        {categories.map((cat, i) => (
          <div key={i} className={`skcard r ${cat.wide ? 'wide' : ''}`} style={{
            background: "var(--gray-light)",
            padding: "40px",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            transition: "all 0.3s ease"
          }}>
            <div className="skcard-ico" style={{ color: "var(--accent)", marginBottom: "24px" }}>{cat.icon}</div>
            <div className="skcard-title" style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "var(--text)",
              marginBottom: "16px",
              letterSpacing: "-0.01em"
            }}>{cat.title}</div>
            <div className="pills" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {cat.pills.map((pill, pi) => (
                <span key={pi} className="pill" style={{
                  padding: "6px 14px",
                  background: "var(--gray-light)",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  transition: "all 0.3s ease"
                }}>{pill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .skcard:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          background: var(--bg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
        }
        .skcard.wide {
          grid-column: span 2;
        }
        @media (max-width: 768px) {
          .skcard.wide {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
