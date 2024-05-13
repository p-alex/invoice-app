interface Props {
  currentYear: number;
  onChange: (year: number) => void;
}

function CalendayYearList({ currentYear, onChange }: Props) {
  const minYear = new Date(Date.now()).getFullYear() - 100;
  const maxYear = new Date(Date.now()).getFullYear() + 101;

  return (
    <ul data-testid="yearList" className="grid h-full grid-cols-3 gap-2 overflow-y-scroll text-sm">
      {[...Array(maxYear - minYear)].map((_, index) => {
        return (
          <li key={"choose-year-" + minYear + index}>
            <button
              data-testid={`yearBtn-${minYear + index}`}
              className={`${currentYear === minYear + index ? "text-primary" : ""} flex w-full items-center justify-center`}
              onClick={() => onChange(minYear + index)}
              autoFocus={minYear + index === currentYear}
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
