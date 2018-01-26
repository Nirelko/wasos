import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  footer: {
    background: theme.palette.grey[800],
    color: 'white',
    height: '100px'
  }
});

export default withStyles(styles)(({classes}) => (
  <footer className={classes.footer}>
    <span>footer</span>
  </footer>
));