import React from 'react';
import {withStyles, Typography, Button, CardContent} from '@material-ui/core';
import {AccountOutline, EmailOutline, Lock} from 'mdi-material-ui';
import {Flex, reflex} from 'reflexbox';
import {compose} from 'recompose';
import {reduxForm} from 'redux-form';
import {required, email} from 'redux-form-validators';

import IconTextField from '../../../../common/icon-text-field';
import {validateBuilder, asyncValidatorBuilder, createAsyncValidator, matchField} from '../../../../common/form/validators';
import {isUsernameAvailable} from './redux';

const style = {
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
)(({classes: {contentContainer, button}, register, handleSubmit, invalid, submitting}) => (
  <FlexCardContent column auto align='center' flex className={contentContainer}>
    <Typography variant='h5'>
      <span>Create your account</span>
    </Typography>
    <IconTextField icon={AccountOutline} fieldProps={{name: 'username', label: 'Username', fullWidth: true}} />
    <IconTextField icon={EmailOutline} fieldProps={{name: 'email', label: 'Email', fullWidth: true}} />
    <IconTextField icon={Lock} fieldProps={{name: 'password', label: 'Password', type: 'password', fullWidth: true}} />
    <IconTextField icon={Lock} fieldProps={{name: 'repassword', label: 'Password', type: 'password', fullWidth: true}} />
    <Flex auto />
    <Button type='submit' variant='contained' color='primary' fullWidth className={button} onClick={handleSubmit(register)} disabled={invalid || submitting}>
      <span>Register</span>
    </Button>
  </FlexCardContent>
));