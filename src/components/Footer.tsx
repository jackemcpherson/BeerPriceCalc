import React from 'react';

interface FooterProps {
  onAddEntry: () => void;
  onSave: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAddEntry, onSave }) => {
  return (
    <footer>
      <nav>
        <button onClick={onAddEntry}>Add New</button>
        <button onClick={onSave}>Save</button>
      </nav>
    </footer>
  );
};

export default Footer;