import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import { Flex, reflex } from 'reflexbox';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form';

const styles = theme => ({
  inputContainer: {
    padding: '16px'
  },
  input: {
    padding: '16px'
  },
  buttonContainer: {
    background: theme.palette.grey[200]
  }
});

const ReflexPaper = reflex(Paper);
const ReflexTexField = reflex(Field);

export default withStyles(styles)(({ classes, text, onClick }) => (
  <ReflexPaper flex>
    <ReflexTexField name='url' component={TextField} InputProps={{ disableUnderline: true, classes: { input: classes.input } }} flex auto placeholder={text} />
    <Flex column justify='center' className={classes.buttonContainer}>
      <IconButton onClick={onClick}>
        <MagnifyIcon />
      </IconButton>
    </Flex>
  </ReflexPaper>
));