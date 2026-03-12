import React from 'react';

const Projects = () => {
  const projects = [
    {
      num: "01",
      tag: "Python · MIT License",
      title: "Sonar",
      desc: "A privacy-centric command-line tool for natural language codebase search. Built with TF-IDF vectorization for efficient, offline indexing without external dependencies.",
      link: "github.com/sxmuel-py/sonar"
    },
    {
      num: "02",
      tag: "Python · Computer Vision",
      title: "Oculus",
      desc: "An offline computer vision utility for automated content moderation. Utilizes skin-tone heuristics and Haar Cascade detection for secure, local-first media analysis.",
      link: "github.com/sxmuel-py/oculus"
    },
    {
      num: "03",
      tag: "Security · Python",
      title: "Security Toolkit",
      desc: "A collection of purpose-built security scripts for automated auditing, reconnaissance, and system monitoring, designed for secure infrastructure management.",
      link: "github.com/sxmuel-py/my-pentest-scripts"
    },
    {
      num: "04",
      tag: "Next.js · Enterprise",
      title: "Helpdesk Pro",
      desc: "A custom internal ticketing system designed for enterprise support workflows, featuring full lifecycle management and optimized resolution tracking.",
      link: "github.com/sxmuel-py"
    }
  ];

  return (
    <section id="projects" style={{ padding: "120px 64px", background: "var(--gray-light)" }}>
      <div className="pj-header" style={{ marginBottom: "64px" }}>
        <div className="stag r">Selected Work</div>
        <h2 className="sh r">Building solutions spanning<br /><em>security and development.</em></h2>
      </div>

      <div className="pjlist" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "40px"
      }}>
        {projects.map((pj, i) => (
          <a key={i} href={`https://${pj.link}`} target="_blank" rel="noopener noreferrer" className="pjcard r" style={{
            background: "var(--bg)",
            padding: "48px",
            borderRadius: "28px",
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--border)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative"
          }}>
            <div className="pjtag" style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "var(--accent)",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>{pj.tag}</div>
            <div className="pjtitle" style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "var(--text)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>{pj.title}</div>
            <div style={{
              fontSize: "17px",
              lineHeight: "1.6",
              color: "var(--text-muted)",
              marginBottom: "32px",
              flexGrow: 1
            }}>{pj.desc}</div>
            <div style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--accent)"
            }}>
              View Source <span className="pjarr">→</span>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .pjcard:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
          border-color: transparent;
        }
        .pjcard:hover .pjarr {
          transform: translateX(4px);
        }
        .pjarr {
          transition: transform 0.3s;
        }
      `}</style>
    </section>
  );
};

export default Projects;
