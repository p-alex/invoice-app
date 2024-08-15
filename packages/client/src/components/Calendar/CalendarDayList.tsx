import getMonthTotalDays from "../../utils/getMonthTotalDays";
import getPrettyDate from "../../utils/getPrettyDate";
import { CalendarDateState } from "./useCalendar";

interface Props {
  currentDate: CalendarDateState;
  handleChange: (day: number) => void;
}

function CalendarDayList({ currentDate, handleChange }: Props) {
  const dayCount = getMonthTotalDays({
    year: currentDate.year,
    zeroBasedMonth: currentDate.zeroBasedMonth,
  });

  return (
    <ul data-testid="dayList" className="relative grid w-full grid-cols-7 gap-1 text-sm">
      {[...Array(dayCount)].map((_, index) => {
        return (
          <li key={"choose-day-" + index + 1}>
            <button
              type="button"
              data-testid={`dayBtn-${index + 1}`}
              className={`${currentDate.day === index + 1 ? "text-primary" : ""} flex w-full items-center justify-center gap-y-4 p-1`}
              onClick={() => handleChange(index + 1)}
              autoFocus={index + 1 === currentDate.day}
              aria-label={`Set date to ${getPrettyDate(currentDate.year, currentDate.zeroBasedMonth, index + 1)}`}
            >
              {index + 1}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CalendarDayList;
