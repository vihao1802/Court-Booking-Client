import dayjs from "dayjs";

export function formatDate(dateString: string): string {
  const date = dayjs(dateString);
  return date.format("MM/DD/YYYY");
}

export function formatVND(amount: Number): String {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
export function getDay(date: Date) {
    // Parse the date with dayjs
    const parsedDate = dayjs(date, "MM/DD/YY");
    // Get day of the week as full name (e.g., "Monday")
    const dayOfWeekName = parsedDate.format("dddd");
    return dayOfWeekName;
  }