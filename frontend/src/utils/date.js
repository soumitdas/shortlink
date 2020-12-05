// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// const dateToDDMMYYYY = (dateString, separator = "-") => {
//   const date = new Date(dateString);
//   const d = date.getDate();
//   const m = date.getMonth() + 1;
//   const y = date.getFullYear();

//   return (
//     (d <= 9 ? "0" + d : d) + separator + (m <= 9 ? "0" + m : m) + separator + y
//   );
// };

// const dateToMonYYYY = (dateString, separator = "-") => {
//   const date = new Date(dateString);
//   const m = date.getMonth();
//   const y = date.getFullYear();

//   return monthShortNames[m] + separator + y;
// };

const dateToMonDDYYYY = (dateString, separator = " ") => {
  const date = new Date(dateString);
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  return monthShortNames[m] + separator + d + separator + y;
};

const dateToMonDDYYYYHHMM = (dateString, separator = " ") => {
  const date = new Date(dateString);
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();

  return (
    monthShortNames[m] +
    separator +
    d +
    separator +
    y +
    separator +
    h +
    ":" +
    min
  );
};

module.exports = { dateToMonDDYYYY, dateToMonDDYYYYHHMM };
