interface Props {
  year: number;
  zeroBasedMonth: number;
}

/** Month should be zero based (eg: 0 is January, 11 is December) */
function getMonthTotalDays({ year, zeroBasedMonth }: Props) {
  if (zeroBasedMonth < 0 || zeroBasedMonth > 11) throw new Error("Invalid month");

  const isMonthEven = (zeroBasedMonth + 1) % 2 === 0;

  const isMonthFeb = zeroBasedMonth === 1;

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
