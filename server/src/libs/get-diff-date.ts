export function getDiffDate(from: Date, to: Date) {
  const diffTime = Math.abs( from.setHours(0,0,0).valueOf() - to.valueOf());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}