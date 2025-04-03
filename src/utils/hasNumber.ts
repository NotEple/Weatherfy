export const hasNumber = (string: string): boolean => {
  const hasNumber: RegExp = /\d/;

  return hasNumber.test(string);
};
