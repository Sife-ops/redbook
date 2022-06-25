export const optionValue = (options: any[], optionName: string) => {
  return options.find((e: any) => e.name === optionName).value;
};
