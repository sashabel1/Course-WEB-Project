import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../style/pagestyle/choose.css';

const Choose = () => {
  const navigate = useNavigate();

  const handleTimelineClick = () => {
    navigate('/search');
  };

  const handleBubbleClick = () => {
    navigate('/bubble');
  };

  const handleCreateTimelineClick = () => {
    navigate('/custom-timeline'); 
  };

  return (
    <div className="choose-page">
      <Header />
      <div className="choose-content">
        <h1 className="app-title">Choose Your Experience</h1>

        <div className="arrow-buttons-vertical">
          <button className="arrow-block down" onClick={handleBubbleClick}>
            EXPLORE BUBBLES
          </button>
          <button className="arrow-block up" onClick={handleTimelineClick}>
            EXPLORE TIMELINE
          </button>
          <button className="arrow-block down" onClick={handleCreateTimelineClick}>
            CREATE YOUR OWN TIMELINE
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Choose;
