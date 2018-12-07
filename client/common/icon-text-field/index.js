import React from 'react';
import {InputAdornment, withStyles} from '@material-ui/core';
import {compose} from 'recompose';
import {TextField} from 'redux-form-material-ui';
import {Field} from 'redux-form';

const styles = {
  field: {
    marginTop: '24px'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {field}, icon: ButtonIcon, fieldProps}) => (
  <Field
    component={TextField}
    className={field}
    fullWidth
    InputProps={{startAdornment: (<InputAdornment position='start'><ButtonIcon /></InputAdornment>)}}
    {...fieldProps}
  />
));