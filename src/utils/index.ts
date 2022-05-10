export const changeFormat = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export const formatPercentage = (value: number, total: number, fixed: number) =>
  Number(((value / total) * 100).toFixed(fixed));
