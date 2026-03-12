```javascript
import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ThemeToggle from "./components/ThemeToggle";
import Particles from "./components/Particles"; // New import
import Preloader from "./components/Preloader"; // New import

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observers = [];
    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}

const NAV_LINKS = [
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
];

function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={scrolled ? "on" : ""} style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: scrolled ? "16px 64px" : "32px 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}>
        <a href="#hero" className="nlogo" style={{
          fontSize: "21px",
          fontWeight: "600",
          letterSpacing: "-0.02em",
          color: "var(--text)",
          textDecoration: "none",
        }}>SAMUEL OLATIDOYE</a>
        
        {/* Desktop Links */}
        <ul className="nlinks" style={{
          display: "flex",
          gap: "36px",
          listStyle: "none",
        }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: activeSection === link.id ? "var(--text)" : "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ display: "flex", alignItems: "center", marginLeft: "12px" }}>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none", // Controlled via media query in index.css (wait, better here)
            background: "none",
            border: "none",
            color: "var(--text)",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`} style={{
        position: "fixed",
        inset: 0,
        background: "var(--black)",
        zIndex: 499,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        transition: "transform 0.5s cubic-bezier(0.77,0,0.175,1)",
        transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
      }}>
        {NAV_LINKS.map((link) => (
          <a 
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: activeSection === link.id ? "var(--accent)" : "var(--text)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .nlinks { display: none !important; }
        }
      `}</style>
    </>
  );
}

// REMOVED LOADER

function App() {
  const [loading, setLoading] = useState(true);
  const activeSection = useActiveSection();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("v"), 0);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".r");
    elements.forEach((el) => io.observe(el));

    return () => elements.forEach((el) => io.unobserve(el));
  }, [loading]);

  return (
    <div className="app-container">
      <Nav activeSection={activeSection} />

      <main style={{ position: "relative" }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer style={{
        padding: "80px 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "12px",
        color: "var(--text-muted)",
        borderTop: "1px solid var(--border)",
      }}>
        <span>© 2026 SAMUEL OLATIDOYE</span>
        <span>SOFTWARE DEVELOPER · CYBERSECURITY SPECIALIST</span>
      </footer>
    </div>
  );
}

export default App;
