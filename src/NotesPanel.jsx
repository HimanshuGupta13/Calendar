import React, { useState, useEffect } from 'react';

const NotesPanel = ({ currentMonth, currentYear, selection }) => {
  const [noteText, setNoteText] = useState("");

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString('default', { month: 'short', day: 'numeric' });
  };

  let storageKey = `note_month_${currentMonth}_${currentYear}`;
  let contextLabel = `General notes for ${currentMonth} ${currentYear}`;

  if (selection.start && selection.end) {
   
    storageKey = `note_range_${selection.start}_${selection.end}`;
    contextLabel = `Notes for ${formatDate(selection.start)} - ${formatDate(selection.end)}`;
  } else if (selection.start) {
  
    storageKey = `note_${selection.start}`;
    contextLabel = `Notes for ${formatDate(selection.start)}, ${currentYear}`;
  }

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    setNoteText(savedData || "");
  }, [storageKey]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setNoteText(value);
    if (value.trim().length > 0) {
      localStorage.setItem(storageKey, value);
    } else {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="notes-panel-wrapper">
      <div className="notes-header-container">
        <h3 className="notes-label">{contextLabel}</h3>
      </div>

      <div className="notes-area">
        <textarea
          className="notes-textarea"
          value={noteText}
          onChange={handleTextChange}
          placeholder="Jot down details for these dates..."
        />
        <div className="lined-background" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="horizontal-line" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;