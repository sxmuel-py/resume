import React, { useState, useEffect } from 'react';

const Typewriter = ({ phrases, typingSpeed = 100, erasingSpeed = 50, pauseTime = 2000 }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Erasing
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? erasingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, erasingSpeed, pauseTime]);

  return (
    <span style={{ borderRight: '2px solid var(--accent)', paddingRight: '4px', animation: 'blink-caret 0.75s step-end infinite' }}>
      {currentText}
      <style>{`
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: var(--accent) }
        }
      `}</style>
    </span>
  );
};

export default Typewriter;
