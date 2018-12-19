import React from 'react';
import {withStyles, Button, ExpansionPanelActions, ExpansionPanelDetails, Grid} from '@material-ui/core';
import {Cash} from 'mdi-material-ui';
import {reduxForm} from 'redux-form';
import {required} from 'redux-form-validators';
import {compose, withHandlers} from 'recompose';

import {validateBuilder} from '../../../../../../../common/form/validators';
import IconTextField from '../../../../../../../common/icon-text-field';
import SizeChooser from '../../../../home/product/header/header-actions/watch-actions/add/add-watch-dialog/size-chooser';
import Actions from './actions';

const style = {
  field: {
    margin: 0
  }
};

const validate = validateBuilder({
  price: [required()],
  size: [required()]
});

export default compose(
  reduxForm({
    validate,
    enableReinitialize: true
  }),
  withStyles(style),
  withHandlers({
    updateWatch: ({username, dispatchUpdateWatch, product: {id: productId}}) => watch => dispatchUpdateWatch(username, {productId, ...watch})
  })
)(({classes: {field}, product: {sizes}, handleSubmit, updateWatch, ...props}) => (
  <form onSubmit={handleSubmit(updateWatch)}>
    <ExpansionPanelDetails>
      <Grid container>
        <Grid item xl={2} lg={4} md={6} xs={12}>
          <IconTextField icon={Cash} classes={{field}} fieldProps={{name: 'price', label: 'Price'}} />
        </Grid>
        <Grid item xl={2} lg={4} md={6} sm={6} xs={12}>
          <SizeChooser sizes={sizes} />
        </Grid>
      </Grid>
    </ExpansionPanelDetails>
    <ExpansionPanelActions>
      <Actions {...props} />
    </ExpansionPanelActions>
  </form>
)
);
