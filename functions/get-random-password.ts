import { getRandomNumberInRange } from './get-random-number-in-range';

import { numbers } from '@/constants/numbers';
import { symbols } from '@/constants/symbols';
import { uppercases } from '@/constants/uppercases';
import { lowercases } from '@/constants/lowercases';

export const entireCharList = [
  ...numbers,
  ...uppercases,
  ...lowercases,
  ...symbols,
];

type Params = {
  charList: string[];
  passwordLength: number;
};

export function getRandomPassword({ charList, passwordLength }: Params) {
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = getRandomNumberInRange(charList.length);
    password += charList[randomIndex];
  }

  return password;
}
