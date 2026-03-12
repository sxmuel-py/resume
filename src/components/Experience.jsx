import React from "react";

const Experience = () => {
  const items = [
    {
      yr: "June 2025 — Present",
      role: "IT Systems & Web Developer",
      co: "Children International School (CIS), Lagos",
      desc: "Designed and implemented a custom enterprise helpdesk system. Providing full-spectrum IT infrastructure support for educational operations, including M365 ecosystems and network management."
    },
    {
      yr: "2024 — Present",
      role: "Cybersecurity Specialist",
      co: "Independent / Freelance",
      desc: "Conducting comprehensive security audits and adversary simulations. Specializing in identity management, secure authentication workflows, and advanced network enumeration."
    },
    {
      yr: "2023 — 2024",
      role: "Junior Systems Developer",
      co: "Children's Way School (CWS), Lagos",
      desc: "Managed the full development lifecycle of internal school applications, focusing on iterative reliability improvements and user-centric feature deployment."
    },
    {
      yr: "Apr 2023 — Oct 2023",
      role: "Software Development Intern",
      co: "Powersoft Integrated Solutions",
      desc: "Developed enterprise report templates using DevExpress and optimized MS SQL Server performance. Collaborated on cross-functional teams to debug and document core infrastructure tools."
    }
  ];

  return (
    <section id="experience" style={{ background: "var(--bg)", padding: "120px 64px", transition: "background-color 0.5s ease" }}>
      <div className="ex-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "80px",
        alignItems: "start"
      }}>
        <div className="ex-left" style={{ position: "sticky", top: "120px" }}>
          <div className="stag r">Path</div>
          <h2 className="sh r">A history of<br /><em>solving problems.</em></h2>
          <div className="abody r" style={{ fontSize: "17px", color: "var(--text-muted)", lineHeight: "1.6", marginTop: "24px" }}>
            From hands-on IT support to high-level system architecting, my career is built on a foundation of technical excellence and a commitment to secure, reliable solutions.
          </div>
        </div>
        <div className="timeline" style={{ position: "relative", paddingLeft: "40px" }}>
          {items.map((it, i) => (
            <div key={i} className="ti r" style={{ marginBottom: "64px", position: "relative" }}>
              <div className="tyr" style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--accent)",
                marginBottom: "8px"
              }}>{it.yr}</div>
              <div className="trole" style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--text)",
                marginBottom: "4px",
                letterSpacing: "-0.01em"
              }}>{it.role}</div>
              <div className="tco" style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--text)",
                marginBottom: "16px"
              }}>{it.co}</div>
              <div className="tdesc" style={{
                fontSize: "16px",
                lineHeight: "1.6",
                color: "var(--text-muted)",
                maxWidth: "540px"
              }}>{it.desc}</div>
              
              <div className="tdot" style={{
                position: "absolute",
                left: "-45px",
                top: "8px",
                width: "9px",
                height: "9px",
                background: "var(--accent)",
                borderRadius: "50%",
                border: "2px solid var(--bg)",
                zIndex: 2
              }} />
            </div>
          ))}
          <div style={{
            position: "absolute",
            left: "0",
            top: "8px",
            bottom: "0",
            width: "1px",
            background: "var(--border)"
          }} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
