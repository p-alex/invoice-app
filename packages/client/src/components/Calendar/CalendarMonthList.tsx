import { getPrettyMonth } from "../../utils/getPrettyDate";
import { CalendarDateState } from "./useCalendar";

interface Props {
  currentDate: CalendarDateState;
  handleChange: (month: number) => void;
}

function CalendarMonthList({ currentDate, handleChange }: Props) {
  return (
    <ul data-testid="monthList" className="grid w-full grid-cols-4 gap-y-4">
      {[...Array(12)].map((_, index) => {
        return (
          <li key={"choose-month-" + index}>
            <button
              type="button"
              data-testid={`monthBtn-${index}`}
              className={`${currentDate.zeroBasedMonth === index ? "text-primary" : ""} flex w-full items-center justify-center p-1`}
              onClick={() => handleChange(index)}
              autoFocus={index === currentDate.zeroBasedMonth}
              aria-label={`Set month to ${index}`}
            >
              {getPrettyMonth(index)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CalendarMonthList;
