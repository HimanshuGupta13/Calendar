import React, { useState } from 'react';
import DayCell from './DayCell';
import NotesPanel from './NotesPanel';

const Calendar = ({ onMonthChange }) => {
  const [viewDate, setViewDate] = useState(new Date()); 
  const [range, setRange] = useState({ start: null, end: null });

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const changeMonth = (dir) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setViewDate(newDate);
    setRange({ start: null, end: null });
    if (onMonthChange) onMonthChange(); 
  };
  const handleDateClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day).getTime();
    if (range.start === selectedDate && !range.end) {
      setRange({ start: null, end: null });
      return;
    }
    if (range.end === selectedDate) {
      setRange({ start: null, end: null });
      return;
    }
    if (!range.start || (range.start && range.end)) {
      setRange({ start: selectedDate, end: null });
    } else if (selectedDate < range.start) {
      setRange({ start: selectedDate, end: null });
    } else {
      setRange({ ...range, end: selectedDate });
    }
  };
  const dateHasNote = (day) => {
    const dateTs = new Date(currentYear, currentMonth, day).getTime();
    const specificKey = `note_${dateTs}`;
    const data = localStorage.getItem(specificKey);
    return data && data.trim().length > 0;
  };
  const getStatus = (day) => {
    const checkDate = new Date(currentYear, currentMonth, day).getTime();
    if (checkDate === range.start) return 'start';
    if (checkDate === range.end) return 'end';
    if (checkDate > range.start && checkDate < range.end) return 'in-range';
    return '';
  };
  return (
    <div className="calendar-body">
      <div className="month-navigation">
        <button onClick={() => changeMonth(-1)} className="nav-btn">{"<"}</button>
        <div className="current-view-label">
          <span className="label-year">{currentYear}</span>
          <h2 className="label-month">{monthName.toUpperCase()}</h2>
        </div>
        <button onClick={() => changeMonth(1)} className="nav-btn">{">"}</button>
      </div>

      <div className="content-grid">
        <NotesPanel currentMonth={monthName} currentYear={currentYear} selection={range} />
        <div className="dates-container">
          <div className="days-header">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
              <span key={d} className="header-day">{d}</span>
            ))}
          </div>
          <div className="days-grid">
            {Array(offset).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="day-cell empty" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
              <DayCell 
                key={`${currentYear}-${currentMonth}-${day}`} 
                day={day} 
                status={getStatus(day)} 
                hasNote={dateHasNote(day)} 
                onClick={() => handleDateClick(day)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;