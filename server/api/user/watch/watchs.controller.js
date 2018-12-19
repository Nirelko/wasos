import {NOT_FOUND} from 'http-status-codes';

import User from '../user.model';

export const save = ({params: {username}, body: watch}, res) => User.findOne({username})
  .then(user => {
    if (user === null) {
      return res.status(NOT_FOUND).send('The user doesn\'t exist');
    }

    user.watches.push(watch);

    return user.save()
      .then(x => x.toObject());
  });

export const update = ({params: {username}, body: {productId, ...updatedWatch}}, res) => User.findOne({username})
  .then(user => {
    if (user === null) {
      return res.status(NOT_FOUND).send('The user doesn\'t exist');
    }

    const oldWatch = user.watches.find(x => x.product.id === productId);
    Object.assign(oldWatch, updatedWatch);

    return user.save()
      .then(x => x.toObject());
  });

export const remove = ({params: {username}, query: {productId}, body: {productsId}}, res) => User.findOne({username})
  .then(user => {
    if (user === null) {
      return res.status(NOT_FOUND).send('The user doesn\'t exist');
    }

    const removedProductsWatches = productId ? [productId] : Object.keys(productsId);

    user.watches = user.watches.filter(x => removedProductsWatches.some(y => y === x.product.id));

    return user.save()
      .then(x => x.toObject());
  });