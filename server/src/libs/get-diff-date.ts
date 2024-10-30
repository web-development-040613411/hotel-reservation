function getDateInUnixTime(date : Date ){
  return Math.floor(date.valueOf() / (1000 * 60 * 60 * 24));
}

export function getDiffDate(from: Date, to: Date) {
  const checkIn = getDateInUnixTime(from);
  const checkOut = getDateInUnixTime(to);
  return checkOut - checkIn;
}