import {connect} from 'react-redux';

import {sizeSchemeChanged} from './redux';
import SizeSchemeChoose from './size-scheme-chooser';

export default connect(
  ({sizeScheme, productSearch: {data: {sizeSchemeToSizesNames} = {}} = {}}) => ({
    sizeScheme,
    availableSizeSchemes: sizeSchemeToSizesNames &&
        Object.assign(...Object.keys(sizeSchemeToSizesNames).map(x => ({[x.toUpperCase()]: x})))
  }),
  dispatch => ({
    localSizeSchemeChanged (newSizeScheme) {
      return dispatch(sizeSchemeChanged(newSizeScheme));
    },
    sizeSchemeChanged ({target: {value: newSizeScheme}}) {
      localStorage.setItem('size-scheme', newSizeScheme);


      return dispatch(sizeSchemeChanged(newSizeScheme));
    }
  }))(SizeSchemeChoose);