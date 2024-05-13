import { useEffect, useState } from "react";
import getMonthTotalDays from "../../utils/getMonthTotalDays";

export enum CalendarSteps {
  "ChooseYear" = 1,
  "ChooseMonth" = 2,
  "ChooseDay" = 3,
}

interface Props {
  date?: Date;
  onChange: (date: Date) => void;
}

type CalendarDateState = {
  day: number;
  month: number;
  year: number;
};

const todayDate = new Date(Date.now());

function useCalendar({ date, onChange }: Props) {
  const [step, setStep] = useState<CalendarSteps>(
    !date ? CalendarSteps["ChooseYear"] : CalendarSteps["ChooseDay"],
  );

  const [currentDate, setCurrentDate] = useState<CalendarDateState>({
    day: date ? date.getDate() : todayDate.getDate(),
    month: date ? date.getMonth() + 1 : todayDate.getMonth() + 1,
    year: date ? date.getFullYear() : todayDate.getFullYear(),
  });

  const handlePrevMonth = () => {
    if (currentDate.month - 1 >= 1) {
      setCurrentDate((prevState) => ({ ...prevState, month: prevState.month - 1 }));
    } else {
      setCurrentDate((prevState) => ({ ...prevState, month: 12, year: prevState.year - 1 }));
    }
  };

  const handleNextMonth = () => {
    if (currentDate.month + 1 <= 12) {
      setCurrentDate((prevState) => ({ ...prevState, month: prevState.month + 1 }));
    } else {
      setCurrentDate((prevState) => ({ ...prevState, month: 1, year: prevState.year + 1 }));
    }
  };

  const handleChooseYearStep = (year: number) => {
    setCurrentDate((prevState) => ({ ...prevState, year }));
    setStep(CalendarSteps["ChooseMonth"]);
  };

  const handleChooseMonthStep = (month: number) => {
    setCurrentDate((prevState) => ({ ...prevState, month }));
    setStep(CalendarSteps["ChooseDay"]);
  };

  const handleChooseDayStep = (day: number) =>
    setCurrentDate((prevState) => ({ ...prevState, day }));

  const handleResetSteps = () => setStep(CalendarSteps["ChooseYear"]);

  useEffect(() => {
    onChange(new Date(currentDate.year, currentDate.month - 1, currentDate.day));
  }, [currentDate.day]);

  useEffect(() => {
    const currentNumOfDaysInMonth = getMonthTotalDays({
      year: currentDate.year,
      month: currentDate.month,
    });

    if (currentDate.day > currentNumOfDaysInMonth) {
      setCurrentDate((prevState) => ({ ...prevState, day: currentNumOfDaysInMonth }));
    }
  }, [currentDate.month, currentDate.year]);

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
