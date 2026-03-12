import React from 'react';

const Marquee = () => {
  const items = [
    "SOFTWARE DEVELOPMENT",
    "CYBERSECURITY",
    "IDENTITY MANAGEMENT",
    "SECURE DEVELOPMENT",
    "PYTHON & TYPESCRIPT",
    "INFRASTRUCTURE AUTOMATION",
    "TECHNICAL CONSULTING",
    "CS GRADUATE 2024"
  ];

  // Double the items for seamless loop
  const doubleItems = [...items, ...items];

  return (
    <div className="mqwrap" style={{
      position: "relative",
      zIndex: 3,
      overflow: "hidden",
      whiteSpace: "nowrap",
      background: "var(--gold)",
      padding: "11px 0",
    }}>
      <div className="mqtrack" style={{
        display: "inline-flex",
        animation: "mq 20.0s linear infinite",
      }}>
        {doubleItems.map((item, i) => (
          <React.Fragment key={i}>
            <span className="mqitem" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "17px",
              letterSpacing: "0.18em",
              color: "var(--black)",
              padding: "0 28px",
            }}>{item}</span>
            <span className="mqdot" style={{
              color: "rgba(0, 0, 0, 0.35)",
              padding: "0 4px",
            }}>◆</span>
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes mq {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
