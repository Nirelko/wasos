import React from 'react';
import {withStyles, Typography, Grid} from '@material-ui/core';
import {compose, withStateHandlers} from 'recompose';
import {Flex, reflex} from 'reflexbox';
import {reduxForm} from 'redux-form';

import Watches from './watches';
import Actions from './actions';

const ReflexGrid = reflex(Grid);

const styles = theme => ({
  mainGrid: {
    padding: '16px',
    background: '#eeeeee',
    overflow: 'auto',
    flexShrink: 0
  },
  title: {
    marginBottom: '8px',
    color: theme.palette.primary[700]
  }
});

export default compose(
  withStyles(styles),
  withStateHandlers({
    isMultiSelect: false
  }, {
    toggleMultiSelect: ({isMultiSelect}) => () => ({isMultiSelect: !isMultiSelect})
  }),
  reduxForm({
    form: 'selectWatches'
  })
)(({classes: {title, mainGrid}, isMultiSelect, toggleMultiSelect, watches, handleSubmit}) => (
  <ReflexGrid flex auto className={mainGrid} container justify='center'>
    <Grid item lg={9} md={11} xs={11}>
      <Flex column>
        <Typography variant='h4' color='primary' className={title}>My Watches</Typography>
        <Actions toggleMultiSelect={toggleMultiSelect} isMultiSelect={isMultiSelect} onSubmit={handleSubmit} watches={watches} />
      </Flex>
      <form>
        <Watches watches={watches} isMultiSelect={isMultiSelect} />
      </form>
    </Grid>
  </ReflexGrid>
));