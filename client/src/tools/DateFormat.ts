export function getDateFormat(date: Date): string {
  return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
}
