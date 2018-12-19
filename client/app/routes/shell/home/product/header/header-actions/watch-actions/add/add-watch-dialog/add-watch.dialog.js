import React from 'react';
import {withStyles, Typography, DialogActions, Button} from '@material-ui/core';
import {Flex} from 'reflexbox';
import {compose, withHandlers} from 'recompose';
import {reduxForm} from 'redux-form';
import getSymbolFromCurrency from 'currency-symbol-map';
import {required} from 'redux-form-validators';
import {Cash} from 'mdi-material-ui';

import ActionDialog from '../../../action-dialog-template';
import IconTextField from '../../../../../../../../../../common/icon-text-field';
import {validateBuilder} from '../../../../../../../../../../common/form/validators';
import SizeChooser from './size-chooser';

const styles = {
  sizeChoose: {
    marginTop: '10px'
  },
  button: {
    color: 'white',
    marginTop: '16px'
  }
};

const validate = validateBuilder({
  price: [required()],
  size: [required()]
});

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'watchListAdd',
    validate
  }),
  withHandlers({
    handleClose: ({onClose: closeDialog, reset}) => () => {
      reset();
      closeDialog();
    },
    addWatch: ({product, username, selectedCurrency: currency, dispatchAddWatch, onClose: handleClose}) => watch => dispatchAddWatch(
      {
        product,
        username,
        currency,
        ...watch
      })
      .then(() => handleClose())
  })
)(({classes: {sizeChoose, button}, open: isDialogOpen, handleClose, product: {sizes = []}, minimumPrice, selectedCurrency, handleSubmit, addWatch, invalid, submitting, pristine}) => (
  <ActionDialog open={isDialogOpen} onClose={handleClose} title='Add To Watch'>
    <form>
      <Flex column p='8px 16px'>
        <Typography variant='h6'>Choose size and price to watch</Typography>
        <Typography variant='subtitle1'>We promise to email you =)</Typography>
        <IconTextField icon={Cash} fieldProps={{name: 'price', label: 'Price', fullWidth: true}} />
        <Typography variant='caption'>The current minimum price
            is: {minimumPrice}{getSymbolFromCurrency(selectedCurrency)}
        </Typography>
        <SizeChooser className={sizeChoose} sizes={sizes} />
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            className={button}
            type='submit'
            onClick={handleSubmit(addWatch)}
            disabled={pristine || invalid || submitting}
          >
            <span>Save</span>
          </Button>
        </DialogActions>
      </Flex>
    </form>
  </ActionDialog>
));
