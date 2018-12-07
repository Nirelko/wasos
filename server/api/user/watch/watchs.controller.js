import User from '../user.model';
import {NOT_FOUND} from 'http-status-codes';

export const save = ({params: {username}, body: watch}, res) => User.findOne({username})
  .then(user => {
    if (user === null) {
      return res.status(NOT_FOUND).send('The user doesn\'t exist');
    }

    user.watches.push(watch);

    return user.save()
      .then(x => x.toObject());
  });

export const remove = ({params: {username, productId}}, res) => User.findOne({username})
  .then(user => {
    if (user === null) {
      return res.status(NOT_FOUND).send('The user doesn\'t exist');
    }

    user.watches = user.watches.filter(x => x.product.id === productId);

    return user.save()
      .then(x => x.toObject());
  });