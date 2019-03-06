import {round} from 'lodash';

export function findJsonInText (text, startIndex = 0) {
  const jsonStartIndex = text.indexOf('{', startIndex);
  let currentIndex = jsonStartIndex + 1;
  let bracketsCounter = 1;

  while (bracketsCounter !== 0 && currentIndex < text.length) {
    if (text[currentIndex] === '{') {
      bracketsCounter++;
    }
    else if (text[currentIndex] === '}') {
      bracketsCounter--;
    }

    currentIndex++;
  }

  if (bracketsCounter !== 0) {
    return null;
  }

  return text.substring(jsonStartIndex, currentIndex)
    .split('\\\'')
    .join('\'');
}

export function extractPidFromUrl (url) {
  const indexOfPrd = url.indexOf('prd/');

  if (indexOfPrd === -1) {
    return;
  }

  const pidStartIndex = indexOfPrd + 'prd/'.length;
  let pidEndIndex = url.indexOf('?', pidStartIndex);

  if (pidEndIndex === -1) {
    pidEndIndex = url.length;
  }

  return url.substring(pidStartIndex, pidEndIndex);
}

export const convert = (price, currentCurrency, targetCurrency) => round((price / currentCurrency) * targetCurrency, 2);