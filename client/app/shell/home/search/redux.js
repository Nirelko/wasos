import { createAction, handleAction } from 'redux-actions';

export const loadProduct = createAction('LOAD_PRODUCT');

export default handleAction(loadProduct, (state, {payload: url}) => {url}, {});
