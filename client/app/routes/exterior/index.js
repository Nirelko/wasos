import React from 'react';
import {Card, withStyles} from '@material-ui/core';
import {Flex, reflex} from 'reflexbox';
import {compose} from 'recompose';

import Routes from './routes';
import appIconSrc from '../../../assests/app-icon.png';

const style = theme => ({
  background: {
    background: '#eeeeee',
    position: 'relative'
  },
  backgroundPrimary: {
    background: theme.palette.primary[500],
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: '60%',
    left: 0
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    padding: '16px'
  },
  appIcon: {
    width: '84px',
    height: '84px'
  },
  card: {
    padding: '8px',
    position: 'relative',
    overflow: 'unset',
    minHeight: '500px',
    minWidth: '350px'
  },
  cardForm: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto'
  }
});

const FlexCard = reflex(Card);

export default compose(
  withStyles(style)
)(({classes: {background, backgroundPrimary, card, iconContainer, appIcon, cardForm}}) => (
  <Flex align='center' justify='center' flex auto className={background}>
    <div className={backgroundPrimary}/>
    <FlexCard flex column className={card}>
      <Card className={iconContainer}>
        <img src={appIconSrc} className={appIcon}/>
      </Card>
      <form className={cardForm}>
        <Routes />
      </form>
    </FlexCard>
  </Flex>
));