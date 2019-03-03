import queryString from 'querystring';

import {extractPidFromUrl} from '../../../../common/utils';

export default () => ({url}, res, next) => {
  const pid = extractPidFromUrl(url);

  if (!pid) {
    return next();
  }

  res.redirect(`/?${queryString.stringify({
    url: `http://www.asos.com${url}`
  })}`);
};