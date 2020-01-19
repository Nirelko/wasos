import {createActions, handleActions} from 'redux-actions';

export const {sizeSchemeChanged} = createActions({
  SIZE_SCHEME_CHANGED: name => name
});

export default handleActions({
  [sizeSchemeChanged]: (state, {payload: name}) => (name)
}, 'eu');
