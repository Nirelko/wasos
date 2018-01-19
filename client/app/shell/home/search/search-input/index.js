import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { Flex, reflex } from 'reflexbox';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import IconButton from 'material-ui/IconButton';

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
const ReflexTexField = reflex(TextField);

export default withStyles(styles)(({ classes, text }) => (
  <ReflexPaper flex>
    <ReflexTexField InputProps={{ disableUnderline: true, classes: { input: classes.input } }} flex auto placeholder={text} />
    <Flex column justify='center' className={classes.buttonContainer}>
      <IconButton>
        <MagnifyIcon />
      </IconButton>
    </Flex>
  </ReflexPaper>
));