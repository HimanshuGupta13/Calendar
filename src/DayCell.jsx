import React from 'react';

const DayCell = ({ day, status, onClick, hasNote }) => {
  return (
    <div className={`day-cell ${status}`} onClick={onClick}>
      <span className="day-number">{day}</span>
      {hasNote && <div className="note-dot"></div>}
    </div>
  );
};

export default DayCell;