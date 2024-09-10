export function isValidCPF(cpf: string): boolean {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[^\d]+/g, "");
  
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  
    const cpfArray: number[] = cpf.split("").map((el) => +el);
  
    const rest = (count: number): number =>
      ((cpfArray
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;
  
    return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
  }
  
  export function isValidPhoneNumber(phoneNumber: string): boolean {
    const numericPhoneNumber = phoneNumber.replace(/\D/g, ""); // Remove não dígitos
  
    const isValidLength =
      numericPhoneNumber.length === 10 || numericPhoneNumber.length === 11;
    const containsOnlyNumbers = /^\d+$/.test(numericPhoneNumber);
  
    return isValidLength && containsOnlyNumbers;
  }
  
