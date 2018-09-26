import React from 'react';
import {withStyles, Typography, Button, CardContent, InputAdornment} from '@material-ui/core';
import {AccountOutline, EmailOutline, Lock} from 'mdi-material-ui';
import {Flex, reflex} from 'reflexbox';
import {compose} from 'recompose';
import {TextField} from 'redux-form-material-ui';
import {reduxForm, Field} from 'redux-form';
import {required, email} from 'redux-form-validators';

import {isUsernameAvailable} from './redux';
import {validateBuilder, asyncValidatorBuilder, createAsyncValidator, matchField} from '../../../../common/form/validators';

const style = {
  field: {
    marginTop: '24px'
  },
  button: {
    marginTop: '48px',
    color: 'white'
  },
  contentContainer: {
    marginTop: '64px'
  }
};

const validations = {
  username: [required()],
  email: [required(), email()],
  password: [required()],
  repassword: [required(), matchField({other: 'password'})]
};

const asyncValidations = {
  username: [createAsyncValidator(isUsernameAvailable, 'Username is not available')]
};

const FlexCardContent = reflex(CardContent);

export default compose(
  withStyles(style),
  reduxForm({
    form: 'register',
    validate: validateBuilder(validations),
    asyncValidate: asyncValidatorBuilder(asyncValidations)
  })
)(({classes: {contentContainer, field, button}, register, handleSubmit, invalid, submitting}) => (
  <FlexCardContent column auto align='center' flex className={contentContainer}>
    <Typography variant='headline'>
      <span>Create your account</span>
    </Typography>
    <Field component={TextField} name='username' label='Username' className={field} fullWidth InputProps={{startAdornment: (<InputAdornment position='start'><AccountOutline /></InputAdornment>)}} />
    <Field component={TextField} name='email' label='Email' className={field} fullWidth InputProps={{startAdornment: (<InputAdornment position='start'><EmailOutline /></InputAdornment>)}} />
    <Field component={TextField} name='password' type='password' label='Password' className={field} fullWidth InputProps={{startAdornment: (<InputAdornment position='start'><Lock /></InputAdornment>)}} />
    <Field component={TextField} name='repassword' type='password' label='Re-type password' className={field} fullWidth InputProps={{startAdornment: (<InputAdornment position='start'><Lock /></InputAdornment>)}} />
    <Flex auto />
    <Button type='submit' variant='contained' color='primary' fullWidth className={button} onClick={handleSubmit(register)} disabled={invalid || submitting}>
      <span>Register</span>
    </Button>
  </FlexCardContent>
));