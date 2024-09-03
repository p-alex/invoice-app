interface Props {
  year: number;
  zeroBasedMonth: number;
}

enum Months {
  January = 0,
  Febuary = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

/** Month should be zero based (eg: 0 is January, 11 is December) */
function getMonthTotalDays({ year, zeroBasedMonth }: Props) {
  if (zeroBasedMonth < 0 || zeroBasedMonth > 11) throw new Error("Invalid month");

  const isMonthFeb = zeroBasedMonth === Months["Febuary"];

  if (
    zeroBasedMonth === Months["January"] ||
    zeroBasedMonth === Months["March"] ||
    zeroBasedMonth === Months["May"] ||
    zeroBasedMonth === Months["July"] ||
    zeroBasedMonth === Months["August"] ||
    zeroBasedMonth === Months["October"] ||
    zeroBasedMonth === Months["December"]
  ) {
    return 31;
  }

  if (
    zeroBasedMonth === Months["April"] ||
    zeroBasedMonth === Months["June"] ||
    zeroBasedMonth === Months["September"] ||
    zeroBasedMonth === Months["November"]
  ) {
    return 30;
  }

  if (isMonthFeb && year % 4 === 0) {
    return 29;
  } else {
    return 28;
  }
}

export default getMonthTotalDays;
