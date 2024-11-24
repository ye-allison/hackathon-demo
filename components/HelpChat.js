import { useState } from 'react';
import Hero from './Hero';

export default function HelpChat() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="help-button" onClick={togglePopup}>
        ?
      </div>
      {isOpen && (
        <div className="popup-container">
          <div className="popup-header">
            <span>Need Help?</span>
            <button className="close-button" onClick={togglePopup}>
              ✖
            </button>
          </div>
          <div className="popup-content">
            <Hero />
          </div>
        </div>
      )}
    </>
  );
}
