import React from 'react';
import {MenuItem, Select} from '@material-ui/core';
import {compose, lifecycle} from 'recompose';
import {head, map} from 'lodash';

export default compose(
  lifecycle({
    componentDidMount () {
      const {localSizeSchemeChanged} = this.props;
      const sizeScheme = localStorage.getItem('size-scheme');

      if (sizeScheme) {
        localSizeSchemeChanged(sizeScheme);
      }
    }
  })
)(({sizeScheme, availableSizeSchemes = {}, sizeSchemeChanged}) => (
  <Select
    name='sizeSchemeChooser'
    value={Object.values(availableSizeSchemes).includes(sizeScheme) ? sizeScheme : head(Object.values(availableSizeSchemes)) || ''}
    displayEmpty
    onChange={sizeSchemeChanged}
  >
    {
      availableSizeSchemes ?
        map(availableSizeSchemes, (sizeSchemeOption, sizeSchemeType) => (
          <MenuItem key={sizeSchemeType} value={sizeSchemeOption}>{sizeSchemeType}</MenuItem>)) :
        <MenuItem values='' />
    }
  </Select>
));