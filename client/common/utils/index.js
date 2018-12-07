import {round} from 'lodash';

export const convert = (price, currentCurrency, targetCurrency) => round((price / currentCurrency) * targetCurrency, 2);