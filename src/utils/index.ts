export const convertToPrice = (price: number, isEnglish: bool): string => {
  const numberString = price
    .toString()
    .split("")
    .reverse()
    .map((num, i) => (i % 3 === 0 && i !== 0 ? num + "," : num))
    .reverse()
    .join("");

  return isEnglish ? "EGY " + numberString : numberString + " جنيها";
};
