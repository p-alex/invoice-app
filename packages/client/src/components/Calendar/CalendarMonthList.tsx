import { getPrettyMonth } from "../../utils/getPrettyDate";

interface Props {
  currentMonth: number;
  onChange: (month: number) => void;
}

function CalendarMonthList({ currentMonth, onChange }: Props) {
  return (
    <ul data-testid="monthList" className="grid w-full grid-cols-4 gap-y-4">
      {[...Array(12)].map((_, index) => {
        return (
          <li key={"choose-month-" + index + 1}>
            <button
              type="button"
              data-testid={`monthBtn-${index + 1}`}
              className={`${currentMonth === index + 1 ? "text-primary" : ""} flex w-full items-center justify-center p-1`}
              onClick={() => onChange(index + 1)}
              autoFocus={index + 1 === currentMonth}
              aria-label={`Set month to ${index + 1}`}
            >
              {getPrettyMonth(index + 1)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CalendarMonthList;
