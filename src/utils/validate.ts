export function isValidatePhoneNumber(phoneNumber: string): boolean {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(phoneNumber);
}