import { useEffect, useRef, useState } from "react";
import Calendar from "../../components/Calendar";
import getPrettyDate from "../../utils/getPrettyDate";

interface Props {
  label: string;
  id: string;
  date?: Date;
  error?: string;
  onChange: (date: Date) => void;
}

function DateGroup(props: Props) {
  const dateGroupContainerRef = useRef<HTMLDivElement>(null);

  const dateGroupToggleRef = useRef<HTMLButtonElement>(null);

  const [date, setDate] = useState<Date>(props.date ? props.date : new Date(Date.now()));

  const currentDay = date.getDate();

  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => setIsActive((prevState) => !prevState);

  const isError = typeof props.error === "string";

  const borderColor = isError ? "border-danger" : "border-borderLT dark:border-borderDT";

  const handleSetDate = (date: Date) => {
    setDate(date);
  };

  const handleDeactivate = () => {
    setIsActive(false);
  };

  const handleDeactivateOnEscPress = (event: KeyboardEvent) => {
    if (event.key === "Escape" && dateGroupContainerRef.current?.contains(document.activeElement)) {
      handleDeactivate();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleDeactivateOnEscPress);
    return () => {
      window.removeEventListener("keydown", handleDeactivateOnEscPress);
    };
  }, []);

  useEffect(() => {
    props.onChange(date);
    setIsActive(false);
  }, [currentDay]);

  return (
    <div className="relative flex flex-col gap-6 rounded-[4px]" ref={dateGroupContainerRef}>
      <div className="flex flex-col gap-2">
        {props.label && (
          <label htmlFor={props.id} className="text-sm font-medium text-muted">
            {props.label}
          </label>
        )}
        <button
          className={`field ${borderColor} flex items-center justify-between`}
          id={props.id}
          onClick={handleToggle}
          data-testid="dateGroupToggle"
          ref={dateGroupToggleRef}
        >
          <div>{getPrettyDate(date.getFullYear(), date.getMonth() + 1, date.getDate())}</div>
          <img src="./images/icon-calendar.svg" width={16} height={16} alt="" />
        </button>
        {props.error && <p className="text-medium text-sm text-danger">{props.error}</p>}
      </div>
      {isActive && (
        <div data-testid="calendarContainer">
          <Calendar date={date} onChange={handleSetDate} />
        </div>
      )}
    </div>
  );
}

export default DateGroup;
