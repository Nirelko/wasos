import React from 'react';
import {withStyles, CardContent, Typography, Button} from '@material-ui/core';
import {reflex, Flex} from 'reflexbox';
import {compose} from 'recompose';
import {TextField} from 'redux-form-material-ui';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';

const style = {
  contentContainer: {
    marginTop: '64px',
    paddingBottom: '0 !important'
  },
  field: {
    marginTop: '24px'
  },
  button: {
    marginTop: '48px',
    color: 'white'
  },
  registerButton: {
    textDecoration: 'none'
  },
  error: {
    marginTop: '36px'
  }
};

const FlexCardContent = reflex(CardContent);

export default compose(
  withStyles(style),
  reduxForm({form: 'login'})
)(({classes: {contentContainer, field, button, registerButton, error}, invalid, submitting, handleSubmit, login, errorMessage}) => (
  <FlexCardContent column auto align='center' flex className={contentContainer}>
    <Typography variant='h5'>
      <span>Login to your account</span>
    </Typography>
    <Field component={TextField} name='username' label='Username' className={field} fullWidth/>
    <Field component={TextField} name='password' type='password' label='Password' className={field} fullWidth/>
    <Button type='submit' variant='contained' color='primary' fullWidth className={button} onClick={handleSubmit(login)} disabled={invalid || submitting}>
      <span>Login</span>
    </Button>
    {errorMessage && <Typography className={error} color='error'>{errorMessage}</Typography>}
    <Flex auto/>
    <Typography variant='caption'>
      <span>Don't have an account yet?</span>
      <Link to='/user/register' className={registerButton}>
        <Button color='primary' disabled={submitting}>
          <span>Register Now!</span>
        </Button>
      </Link>
    </Typography>
  </FlexCardContent>
));