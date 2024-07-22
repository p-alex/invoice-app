export function getPrettyMonth(month: number) {
  const correctMonth = month as keyof typeof months;

  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  return months[correctMonth];
}

function getPrettyDate(year: number, month: number, day: number) {
  return new Date(year, month - 1, day).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default getPrettyDate;
