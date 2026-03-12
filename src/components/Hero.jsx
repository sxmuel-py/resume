import React from 'react';
import Typewriter from './Typewriter';

const Hero = () => {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "160px 64px 80px 64px",
      position: "relative",
    }}>
      <div className="hero-eyebrow r" style={{
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--accent)",
        marginBottom: "20px",
      }}>
        Available for new opportunities · Lagos, NG
      </div>

      <h1 className="hero-name r" style={{
        fontSize: "clamp(42px, 9vw, 100px)",
        fontWeight: "800",
        lineHeight: "1",
        letterSpacing: "-0.04em",
        marginBottom: "32px",
        color: "var(--text)"
      }}>
        <span style={{ display: "block" }}>Designing & building</span>
        <span style={{ 
          display: "block",
          color: "var(--text-muted)"
        }}>
          <Typewriter phrases={["innovative software.", "secure infrastructures.", "scalable applications.", "resilient systems."]} />
        </span>
      </h1>

      <div className="hero-role r" style={{
        fontSize: "clamp(18px, 2.5vw, 24px)",
        color: "var(--text-muted)",
        maxWidth: "800px",
        lineHeight: "1.4",
        marginBottom: "48px",
      }}>
        Samuel Olatidoye is a <span style={{ color: "var(--text)" }}>Software Developer</span> and <span style={{ color: "var(--text)" }}>Cybersecurity Specialist</span> focused on creating functional, high-performance applications with a focus on security and privacy.
      </div>

      <div className="hero-btns r" style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
      }}>
        <a href="#projects" className="btn-a btn-fill">View Projects</a>
        <a href="#contact" className="btn-a btn-ghost">Get in touch</a>
      </div>

      <div className="hero-scroll r" style={{
        position: "absolute",
        bottom: "40px",
        left: "64px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "12px",
        color: "var(--text-muted)",
      }}>
        <div style={{
          width: "1px",
          height: "40px",
          background: "var(--border)",
        }} />
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
};

export default Hero;
