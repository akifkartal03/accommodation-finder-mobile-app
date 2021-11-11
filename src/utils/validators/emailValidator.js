export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email boş olamaz!";
  if (!re.test(email)) return "Geçerli bir mail adresi giriniz!";
  return "";
}
