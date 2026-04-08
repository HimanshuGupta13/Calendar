import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import './App.css';
const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=1200&q=80'
];

function App() {
  const [heroImage, setHeroImage] = useState(IMAGE_POOL[0]);

  const shuffleImage = () => {
    let newImg;
    do {
      newImg = IMAGE_POOL[Math.floor(Math.random() * IMAGE_POOL.length)];
    } while (newImg === heroImage);
    setHeroImage(newImg);
  };

  useEffect(() => {
    shuffleImage();
  }, []);

  return (
    <div className="app-container">
      <div className="calendar-wall-mount">
        <div className="calendar-binding"></div>
        <div className="calendar-paper">
          <div className="hero-section">
            <img src={heroImage} alt="Monthly Scene" className="hero-image" />
          </div>
          <Calendar onMonthChange={shuffleImage} />
        </div>
      </div>
    </div>
  );
}

export default App;