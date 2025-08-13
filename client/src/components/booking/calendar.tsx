import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const formatDateString = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const isDateDisabled = (day: number) => {
    const today = new Date();
    const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return cellDate < today;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm" data-testid="calendar-container">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('prev')}
          data-testid="button-prev-month"
        >
          <ChevronLeft size={16} />
        </Button>
        
        <h4 className="font-medium text-charcoal" data-testid="text-current-month">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('next')}
          data-testid="button-next-month"
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-sm mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center py-2 text-charcoal/60 font-medium" data-testid={`day-header-${index}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-sm" data-testid="calendar-grid">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} className="py-2" data-testid={`empty-cell-${index}`}></div>;
          }

          const dateString = formatDateString(day);
          const isSelected = selectedDate === dateString;
          const isDisabled = isDateDisabled(day);

          return (
            <button
              key={index}
              onClick={() => !isDisabled && onDateSelect(dateString)}
              disabled={isDisabled}
              className={`
                calendar-cell text-center py-2 rounded transition-all
                ${isSelected ? 'bg-lavender text-white' : ''}
                ${isDisabled ? 'text-charcoal/30 cursor-not-allowed' : 'cursor-pointer hover:bg-sage hover:text-white'}
                ${!isSelected && !isDisabled ? 'text-charcoal' : ''}
              `}
              data-testid={`calendar-day-${day}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
