export const reduceToSingleDigit = (number) => {
  while (number > 22) {
      number = number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return number;
};
