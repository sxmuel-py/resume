import React from 'react';

const About = () => {
  return (
    <section id="about" style={{ padding: "120px 64px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "80px",
        alignItems: "start",
      }}>
        <div>
          <div className="stag r">Background</div>
          <h2 className="sh r">Building robust systems<br /><em>with a security-first mindset.</em></h2>
          <div className="abody r" style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "var(--text-muted)",
          }}>
            <p style={{ marginBottom: "24px" }}>
              I'm <strong>Samuel Olatidoye</strong>, a Computer Science grad with a focus on system reliability and security. My experience ranges from developing bespoke tools to managing secure IT infrastructures in high-stakes environments.
            </p>
            <p style={{ marginBottom: "24px" }}>
              I specialize in bridging the gap between <span style={{ color: "var(--text)" }}>Software Development</span> and <span style={{ color: "var(--text)" }}>Cybersecurity</span>, ensuring that every application I build is as resilient as it is functional.
            </p>
            <p>
              Whether it's architecting a new helpdesk system or securing an existing network, my goal is always the same: to deliver high-performance solutions that users can trust.
            </p>
          </div>
        </div>
        <div className="r" style={{
          background: "var(--gray-light)",
          borderRadius: "32px",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          border: "1px solid var(--border)"
        }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)" }}>EDUCATION</div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>B.Sc. Computer Science</div>
            <div style={{ fontSize: "16px", color: "var(--text-muted)" }}>Caleb University · Class of 2024</div>
          </div>
          <div style={{ height: "1px", background: "var(--border)" }} />
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)" }}>LATEST FOCUS</div>
          <div style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: "1.5" }}>
            Developing offline-first security utilities and enterprise support workflows with Modern Web Technologies.
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
