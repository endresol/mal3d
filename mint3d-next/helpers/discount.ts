export const getDiscount = (apes: number): number => {
  if (apes === 10) return 15;
  if (apes === 5) return 10;
  return 5;
};
