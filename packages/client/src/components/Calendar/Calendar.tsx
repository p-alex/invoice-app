import CalendarMonthList from "./CalendarMonthList";
import CalendarDayList from "./CalendarDayList";
import CalendayYearList from "./CalendayYearList";
import useCalendar, { CalendarSteps } from "./useCalendar";
import getPrettyDate from "../../utils/getPrettyDate";

export interface CalendarProps {
  date?: Date;
  handleChange: (date: Date) => void;
}

function Calendar({ date, handleChange }: CalendarProps) {
  const {
    step,
    currentDate,
    handlePrevMonth,
    handleNextMonth,
    handleChooseYearStep,
    handleChooseMonthStep,
    handleChooseDayStep,
    handleResetSteps,
  } = useCalendar({ date, handleChange });

  return (
    <div className="relative flex max-h-[260px] w-[240px] flex-col rounded-[8px] bg-uiBgLT px-4 py-6 font-bold text-textLT shadow-lg dark:bg-uiBgDT dark:text-textDT">
      <div className="mx-auto mb-8 flex items-center gap-8 text-center">
        {step === CalendarSteps["ChooseDay"] && (
          <button
            type="button"
            data-testid="prevMonthBtn"
            className="flex h-5 w-5 items-center justify-center"
            onClick={handlePrevMonth}
            aria-label="previous month"
          >
            <img src="./images/icon-arrow-left.svg" width={7} height={10} alt="" />
          </button>
        )}

        <button type="button" data-testid="fullDateBtn" onClick={handleResetSteps}>
          {getPrettyDate(currentDate.year, currentDate.zeroBasedMonth, currentDate.day)}
        </button>

        {step === CalendarSteps["ChooseDay"] && (
          <button
            type="button"
            data-testid="nextMonthBtn"
            className="flex h-5 w-5 items-center justify-center"
            onClick={handleNextMonth}
            aria-label="next month"
          >
            <img src="./images/icon-arrow-right.svg" width={7} height={10} alt="" />
          </button>
        )}
      </div>

      {step === CalendarSteps["ChooseYear"] && (
        <CalendayYearList currentDate={currentDate} handleChange={handleChooseYearStep} />
      )}

      {step === CalendarSteps["ChooseMonth"] && (
        <CalendarMonthList currentDate={currentDate} handleChange={handleChooseMonthStep} />
      )}

      {step === CalendarSteps["ChooseDay"] && (
        <CalendarDayList currentDate={currentDate} handleChange={handleChooseDayStep} />
      )}
    </div>
  );
}

export default Calendar;
