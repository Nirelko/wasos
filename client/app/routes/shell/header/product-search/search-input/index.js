import React from 'react';
import {Paper, IconButton, withStyles} from '@material-ui/core';
import {Flex, reflex} from 'reflexbox';
import {Magnify} from 'mdi-material-ui';
import {TextField} from 'redux-form-material-ui';
import {Field} from 'redux-form';
import {compose} from 'recompose';
import {noop} from 'lodash';

const styles = theme => ({
  inputContainer: {
    padding: '8px'
  },
  input: {
    transition: 'all 0.3s',
    padding: '8px'
  },
  buttonWrapper: {
    background: theme.palette.grey[200],
    borderRadius: '4px'
  },
  root: {
    transition: 'all 0.3s',
    height: '40px',
    width: '40px'
  },
  icon: {
    position: 'relative',
    bottom: '2px'
  }
});

const ReflexPaper = reflex(Paper);
const ReflexField = reflex(Field);

export default compose(
  withStyles(styles)
)(({classes: {input, buttonWrapper, iconButton, root, icon}, text, onClick = noop, disabled}) => (
  <ReflexPaper flex auto align='center'>
    <ReflexField
      name='url'
      component={TextField}
      InputProps={{disableUnderline: true, classes: {input}}}
      fullWidth
      placeholder={text}
      disabled={disabled}
    />
    <Flex column justify='center' className={buttonWrapper}>
      <IconButton className={iconButton} classes={{root}} type='submit' onClick={onClick} disabled={disabled}>
        <Magnify className={icon}/>
      </IconButton>
    </Flex>
  </ReflexPaper>
));