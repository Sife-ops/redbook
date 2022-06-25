import { faker } from '@faker-js/faker';

export const mnemonic = () => {
  const a = faker.word.adjective();
  const b = faker.word.adjective();
  const c = faker.word.noun();
  return `${a}-${b}-${c}`;
};

export const optionValue = (options: any[], optionName: string) => {
  return options.find((e: any) => e.name === optionName).value;
};
