import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import {withStyles} from 'material-ui/styles';
import {Flex, reflex} from 'reflexbox';
import { Magnify } from 'mdi-material-ui';
import {TextField} from 'redux-form-material-ui';
import {Field} from 'redux-form';
import {compose} from 'recompose';
import _ from 'lodash';

const styles = theme => ({
  inputContainer: {
    padding: '16px'
  },
  input: {
    transition: 'all 0.3s',
    padding: '16px'
  },
  buttonContainer: {
    background: theme.palette.grey[200]
  },
  root: {
    transition: 'all 0.3s'
  }
});

const ReflexPaper = reflex(Paper);
const ReflexTexField = reflex(Field);

export default compose(
  withStyles(styles)
)(({classes: { input, buttonContainer, root }, text, onClick = _.noop, disabled}) => (
  <ReflexPaper flex>
    <ReflexTexField
      name='url'
      component={TextField}
      InputProps={{disableUnderline: true, classes: {input}}}
      flex
      auto
      placeholder={text}
      disabled={disabled}
    />
    <Flex column justify='center' className={buttonContainer}>
      <IconButton classes={{root}} type='submit' onClick={onClick} disabled={disabled}>
        <Magnify />
      </IconButton>
    </Flex>
  </ReflexPaper>
));