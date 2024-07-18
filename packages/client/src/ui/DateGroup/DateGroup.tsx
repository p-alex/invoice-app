import { useEffect, useRef, useState } from "react";
import Calendar from "../../components/Calendar";
import getPrettyDate from "../../utils/getPrettyDate";
import VisibiltyToggleProvider from "../../components/VisibilityToggleProvider";

interface Props {
  label: string;
  id: string;
  dateInUTCFormat?: string;
  error?: string;
  onChange: (dateInUTCFormat: string) => void;
}

function DateGroup(props: Props) {
  const dateGroupContainerRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date>(
    props.dateInUTCFormat ? new Date(props.dateInUTCFormat) : new Date(Date.now()),
  );

  const currentDay = date.getDate();

  const isError = typeof props.error === "string";

  const borderColor = isError ? "border-danger" : "border-borderLT dark:border-borderDT";

  const handleSetDate = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    props.onChange(date.toUTCString());
  }, [currentDay]);

  return (
    <div className="relative flex w-full flex-col gap-6 rounded-[4px]" ref={dateGroupContainerRef}>
      <div className="flex flex-col gap-2">
        {props.label && (
          <label htmlFor={props.id} className="text-sm font-medium text-muted">
            {props.label}
          </label>
        )}
        <VisibiltyToggleProvider
          toggle={({ handleToggleVisibilty, toggleRef }) => (
            <>
              <button
                type="button"
                className={`field ${borderColor} flex items-center justify-between`}
                id={props.id}
                onClick={handleToggleVisibilty}
                data-testid="dateGroupToggle"
                ref={toggleRef}
              >
                <div>{getPrettyDate(date.getFullYear(), date.getMonth() + 1, date.getDate())}</div>
                <img src="./images/icon-calendar.svg" width={16} height={16} alt="" />
              </button>
              {props.error && <p className="text-medium text-sm text-danger">{props.error}</p>}
            </>
          )}
          content={() => (
            <div className="absolute top-24" data-testid="calendarContainer">
              <Calendar date={date} onChange={handleSetDate} />
            </div>
          )}
          hideWithEsc
        />
      </div>
    </div>
  );
}

export default DateGroup;
