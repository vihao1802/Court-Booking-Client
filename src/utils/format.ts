import dayjs from "dayjs";

export function formatDate(dateString: string): string {
  const date = dayjs(dateString);
  return date.format("MM/DD/YYYY");
}

export function formatVND(amount: Number): String {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
