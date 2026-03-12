import React from 'react';

const Contact = () => {
  return (
    <section id="contact" style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "80px 64px",
      background: "var(--bg)"
    }}>
      <div className="ct-label r" style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--accent)",
        marginBottom: "24px"
      }}>Available for consultation</div>
      
      <div className="ct-big r" style={{
        fontSize: "clamp(32px, 5vw, 64px)",
        fontWeight: "800",
        lineHeight: "1.1",
        letterSpacing: "-0.04em",
        marginBottom: "56px",
        maxWidth: "900px"
      }}>
        Let's build something<br />
        <a href="mailto:contact@samuelolatidoye.space" style={{
          color: "var(--text)",
          textDecoration: "underline",
          textDecorationThickness: "2px",
          textUnderlineOffset: "8px"
        }}>
          contact@samuelolatidoye.space
        </a>
      </div>

      <div className="ct-row r" style={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        <a
          href="https://github.com/sxmuel-py"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-a btn-fill"
        >GitHub ↗</a>
        <a
          href="https://www.linkedin.com/in/samuel-olatidoye-880279300/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-a btn-fill"
        >LinkedIn ↗</a>
        <a
          href="/Samuel_Olatidoye_CV.docx"
          download="Samuel_Olatidoye_CV.docx"
          className="btn-a btn-ghost"
        >Download CV</a>
      </div>
    </section>
  );
};

export default Contact;
