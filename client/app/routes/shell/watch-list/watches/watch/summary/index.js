import React, {Fragment} from 'react';
import {withStyles, Avatar, Typography} from '@material-ui/core';
import {Flex, reflex} from 'reflexbox';
import getSymbolFromCurrency from 'currency-symbol-map';
import {compose} from 'recompose';

const ReflexTypography = reflex(Typography);

const style = {
  avatar: {
    height: '64px',
    width: '64px'
  }
};

export default compose(
  withStyles(style)
)(({classes: {avatar}, product: {name, images: [image], sizes}, price, currency, sizeId}) => (
  <Fragment>
    <Avatar src={image} className={avatar} />
    <Flex auto>
      <Flex column auto justify='center' ml={8} auto>
        <Typography variant='subtitle2'>{name}</Typography>
        <Flex>
          <ReflexTypography flex auto>Price: {price}{getSymbolFromCurrency(currency)}</ReflexTypography>
          <ReflexTypography flex auto>Size: {sizes.find(x => x.id === sizeId).name}</ReflexTypography>
        </Flex>
      </Flex>
    </Flex>
  </Fragment>
));