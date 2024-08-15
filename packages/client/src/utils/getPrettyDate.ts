export function getPrettyMonth(zeroBasedMonth: number) {
  const correctMonth = zeroBasedMonth as keyof typeof months;

  const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  return months[correctMonth];
}

function getPrettyDate(year: number, zeroBasedMonth: number, day: number) {
  return new Date(year, zeroBasedMonth, day).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default getPrettyDate;
