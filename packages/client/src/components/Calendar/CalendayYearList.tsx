import { CalendarDateState } from "./useCalendar";

interface Props {
  currentDate: CalendarDateState;
  handleChange: (year: number) => void;
}

function CalendayYearList({ currentDate, handleChange }: Props) {
  const minYear = new Date(Date.now()).getFullYear() - 100;
  const maxYear = new Date(Date.now()).getFullYear() + 101;

  return (
    <ul
      data-testid="yearList"
      className="grid h-full w-full grid-cols-3 gap-2 overflow-y-scroll text-sm"
    >
      {[...Array(maxYear - minYear)].map((_, index) => {
        return (
          <li key={"choose-year-" + minYear + index}>
            <button
              type="button"
              data-testid={`yearBtn-${minYear + index}`}
              className={`${currentDate.year === minYear + index ? "text-primary" : ""} flex w-full items-center justify-center`}
              onClick={() => handleChange(minYear + index)}
              autoFocus={minYear + index === currentDate.year}
              aria-label={`Set year to ${minYear + index}`}
            >
              {minYear + index}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CalendayYearList;
