import React from 'react';
import '../Style/Calendrier.scss';

const Calendar = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);// Get the first day of the month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate(); //Number of days

  // Get the day of the week of the first day of the month
  const startingDayOfWeek = firstDayOfMonth.getDay() || 7; // Adjusted for a Monday start (make Sunday = 7 if using Sunday as start of week)

  // Generate an array for the blank spaces before the first day of the month
  const emptyDays = Array(startingDayOfWeek - 1).fill(null);

  // Generate an array for the days of the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Combine the arrays and split into weeks
  const totalDays = [...emptyDays, ...days];
  const weeks = [];

  while (totalDays.length) {
    weeks.push(totalDays.splice(0, 7));
  }

  // Array of month names
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  return (
    <div className="calendar-container">
      <table className="wp-calendar">
        <thead>
          <tr>
            <th colSpan="7" className="month-header">{monthNames[currentMonth]} {currentYear}</th>
          </tr>
          <tr>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mer</th>
            <th>Jeu</th>
            <th>Ven</th>
            <th>Sam</th>
            <th>Dim</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day, idx) => (
                <td key={idx} className={day === today.getDate() && new Date().getMonth() === currentMonth ? 'today' : undefined}>
                  {day || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;