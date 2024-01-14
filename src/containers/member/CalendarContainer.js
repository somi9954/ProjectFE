import React, { useState, useEffect, useCallback } from 'react';
import CalendarComponent from '../../components/member/CalendarComponent';
import { getData } from '../../lib/calendar';

const today = new Date();
const CalendarContainer = () => {
  const [dates, setDates] = useState([]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  useEffect(() => {
    setDates(() => getData());
  }, []);

  const onDateClick = useCallback((dateStr) => {
    console.log(dateStr);
  }, []);

  const onChangeYearMonth = useCallback(
    (gap) => {
      const date = new Date(year, month, 1);
      date.setMonth(date.getMonth() + gap);
      setYear(() => date.getFullYear());
      setMonth(() => date.getMonth());
      setDates(() => getData(month, year));
    },
    [month, year],
  );
  return (
    <CalendarComponent
      year={year}
      month={month}
      dates={dates}
      onDateClick={onDateClick}
      onChangeYearMonth={onChangeYearMonth}
    />
  );
};

export default CalendarContainer;
