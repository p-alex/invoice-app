interface Props {
  year: number;
  month: number;
}

/** Month should not be zero based (eg: 1 is January, 12 is December) */
function getMonthTotalDays({ year, month }: Props) {
  if (month < 1 || month > 12) throw new Error("Invalid month");

  const isMonthEven = month % 2 === 0;

  const isMonthFeb = month === 2;

  if (!isMonthEven) {
    return 31;
  }

  if (isMonthEven && !isMonthFeb) {
    return 30;
  }

  if (isMonthFeb && year % 4 === 0) {
    return 29;
  } else {
    return 28;
  }
}

export default getMonthTotalDays;
