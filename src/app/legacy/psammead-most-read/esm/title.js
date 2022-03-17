function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { C_SHADOW } from '#legacy/psammead-styles/colours';
import { getTrafalgar } from '#legacy/gel-foundations/typography';
import { scriptPropType } from '#legacy/gel-foundations/prop-types';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';
var StyledHeading =
  /*#__PURE__*/
  styled.h2.withConfig({
    displayName: 'StyledHeading',
    componentId: 'jk7ltd-0',
  })(
    ['', ';', ' color:', ';'],
    function (_ref) {
      var script = _ref.script;
      return script && getTrafalgar(script);
    },
    function (_ref2) {
      var service = _ref2.service;
      return getSansRegular(service);
    },
    C_SHADOW,
  );

var MostReadTitle = function MostReadTitle(_ref3) {
  var header = _ref3.header,
    props = _objectWithoutProperties(_ref3, ['header']);

  return React.createElement(StyledHeading, props, header);
};

MostReadTitle.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  header: string.isRequired,
};
export default MostReadTitle;
