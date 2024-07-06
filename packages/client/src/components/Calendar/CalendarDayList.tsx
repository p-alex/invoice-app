import getMonthTotalDays from "../../utils/getMonthTotalDays";
import getPrettyDate from "../../utils/getPrettyDate";

interface Props {
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  onChange: (day: number) => void;
}

function CalendarDayList({ currentYear, currentMonth, currentDay, onChange }: Props) {
  const dayCount = getMonthTotalDays({ year: currentYear, month: currentMonth });

  return (
    <ul data-testid="dayList" className="relative grid w-full grid-cols-7 gap-1 text-sm">
      {[...Array(dayCount)].map((_, index) => {
        return (
          <li key={"choose-day-" + index + 1}>
            <button
              type="button"
              data-testid={`dayBtn-${index + 1}`}
              className={`${currentDay === index + 1 ? "text-primary" : ""} flex w-full items-center justify-center gap-y-4 p-1`}
              onClick={() => onChange(index + 1)}
              autoFocus={index + 1 === currentDay}
              aria-label={`Set date to ${getPrettyDate(currentYear, currentMonth, index + 1)}`}
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
