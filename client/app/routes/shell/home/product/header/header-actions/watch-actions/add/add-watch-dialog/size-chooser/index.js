import React from 'react';
import Select from 'redux-form-material-ui/lib/Select';
import {FormControl, InputLabel, MenuItem} from '@material-ui/core';
import {Field} from 'redux-form';

export default ({className, sizes}) => (
  <FormControl className={className}>
    <InputLabel htmlFor='sizes-select'>Size</InputLabel>
    <Field inputProps={{ name: 'sizeId', id: 'sizes-select'}} component={Select} name='sizeId'>
      {sizes.map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>)}
    </Field>
  </FormControl>
);