export function formatVND(amount: Number): String {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
