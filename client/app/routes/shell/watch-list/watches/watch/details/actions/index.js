import React, {Fragment} from 'react';
import {Button} from '@material-ui/core';

import DeleteAction from './delete-action';

export default ({invalid, submitting, pristine}) => (
  <Fragment>
    <DeleteAction />
    <Button color='primary' type='submit' disabled={invalid || submitting || pristine}>Save</Button>
  </Fragment>
);