import {AsyncRouter} from 'express-async-router';
import { getCurrencies } from './currency.controller';

const currenciesRouter = AsyncRouter();

currenciesRouter.get('/', getCurrencies);

export default currenciesRouter;