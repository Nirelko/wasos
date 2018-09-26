import {map, pickBy, identity, debounce} from 'lodash';
import {addValidator} from 'redux-form-validators';

const getFieldErrors = (validators, values, fieldName) => validators.map(validator => validator(values[fieldName], values)).find(x => x);

export const validateBuilder = fieldsValidators => values => Object.assign(...map(fieldsValidators, (validators, fieldName) => ({
  [fieldName]: getFieldErrors(validators, values, fieldName)
})));

export const matchField = addValidator({
  defaultMessage: 'The passwords don\'t match',
  validator: ({other}, value, allValues) => value === allValues[other]
});

export const createAsyncValidator = (validatorActionCreator, message) => ({validatorActionCreator, message});

const getAsyncFieldsErrors = (validatorsActionCreators, dispatch, value, fieldName) => Promise
  .all(validatorsActionCreators
    .map(({validatorActionCreator, message}) => dispatch(validatorActionCreator(value))
      .then(({payload: {data: result}}) => !result && message)))
  .then(errors => ({[fieldName]: errors.find(x => x)}));

const validateAsyncFields = (fieldsValidatorActionCreatorss, dispatch, values) =>
  Promise.all(map(fieldsValidatorActionCreatorss, (validatorsActionCreators, fieldName) =>
    getAsyncFieldsErrors(validatorsActionCreators, dispatch, values[fieldName], fieldName)));

const removeEmptyErrorFields = (fieldsErrors) => pickBy(Object.assign(...fieldsErrors), identity);

export const asyncValidatorBuilder = (fieldsValidatorActionCreatorss, {debounceTimeout} = {debounceTimeout: 0}) => debounce((values, dispatch) =>
  validateAsyncFields(fieldsValidatorActionCreatorss, dispatch, values)
  .then(fieldsErrors => {
    const errors = removeEmptyErrorFields(fieldsErrors);

    return Object.keys(errors).length ? Promise.reject(errors) : Promise.resolve();
  }), debounceTimeout);