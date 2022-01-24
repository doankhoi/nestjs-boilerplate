import * as randomString from 'randomstring';

export const randPhrases = (len = 16) => {
  return randomString.generate(len);
};
