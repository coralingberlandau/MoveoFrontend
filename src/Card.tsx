import React from 'react';
import './card.css';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    if (title === '+') {
      navigate('/addblock');
    } else {
      navigate(`/codeblock/${title}`);
    }
  };

  return (
    <div className="code-card" onClick={() => handleCardClick(title)}>
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
