import MoneyResource from '../../resoucres/money.resource';

export const getCurrencies = () => new MoneyResource().get();