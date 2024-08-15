import { useEffect, useRef, useState } from "react";
import getMonthTotalDays from "../../utils/getMonthTotalDays";
import { CalendarProps } from "./Calendar";

export enum CalendarSteps {
  "ChooseYear" = 1,
  "ChooseMonth" = 2,
  "ChooseDay" = 3,
}

export type CalendarDateState = {
  day: number;
  zeroBasedMonth: number;
  year: number;
};

function useCalendar({ date, handleChange }: CalendarProps) {
  const [step, setStep] = useState<CalendarSteps>(
    !date ? CalendarSteps["ChooseYear"] : CalendarSteps["ChooseDay"],
  );

  const todayDate = useRef<Date>(new Date(Date.now()));

  const [currentDate, setCurrentDate] = useState<CalendarDateState>({
    day: date ? date.getDate() : todayDate.current.getDate(),
    zeroBasedMonth: date ? date.getMonth() : todayDate.current.getMonth(),
    year: date ? date.getFullYear() : todayDate.current.getFullYear(),
  });

  const handlePrevMonth = () => {
    if (currentDate.zeroBasedMonth > 0) {
      setCurrentDate((prevState) => ({
        ...prevState,
        zeroBasedMonth: prevState.zeroBasedMonth - 1,
      }));
    } else {
      setCurrentDate((prevState) => ({
        ...prevState,
        zeroBasedMonth: 11,
        year: prevState.year - 1,
      }));
    }
  };

  const handleNextMonth = () => {
    if (currentDate.zeroBasedMonth < 11) {
      setCurrentDate((prevState) => ({
        ...prevState,
        zeroBasedMonth: prevState.zeroBasedMonth + 1,
      }));
    } else {
      setCurrentDate((prevState) => ({
        ...prevState,
        zeroBasedMonth: 0,
        year: prevState.year + 1,
      }));
    }
  };

  const handleChooseYearStep = (year: number) => {
    setCurrentDate((prevState) => ({ ...prevState, year }));
    setStep(CalendarSteps["ChooseMonth"]);
  };

  const handleChooseMonthStep = (zeroBasedMonth: number) => {
    setCurrentDate((prevState) => ({ ...prevState, zeroBasedMonth }));
    setStep(CalendarSteps["ChooseDay"]);
  };

  const handleChooseDayStep = (day: number) =>
    setCurrentDate((prevState) => ({ ...prevState, day }));

  const handleResetSteps = () => setStep(CalendarSteps["ChooseYear"]);

  useEffect(() => {
    const currentNumOfDaysInMonth = getMonthTotalDays({
      year: currentDate.year,
      zeroBasedMonth: currentDate.zeroBasedMonth,
    });

    if (currentDate.day > currentNumOfDaysInMonth) {
      setCurrentDate((prevState) => ({ ...prevState, day: currentNumOfDaysInMonth }));
    }
  }, [currentDate.zeroBasedMonth, currentDate.year]);

  useEffect(() => {
    handleChange(new Date(currentDate.year, currentDate.zeroBasedMonth, currentDate.day));
  }, [currentDate.day]);

  return {
    step,
    currentDate,
    handlePrevMonth,
    handleNextMonth,
    handleChooseYearStep,
    handleChooseMonthStep,
    handleChooseDayStep,
    handleResetSteps,
  };
}

export default useCalendar;
