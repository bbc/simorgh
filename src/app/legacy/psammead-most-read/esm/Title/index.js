import React from 'react';
import styled from 'styled-components';
import { oneOf, shape, string } from 'prop-types';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { getTrafalgar } from '@bbc/gel-foundations/typography';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
var MOST_READ_LABEL = 'most-read-title';
var StyledHeading =
/*#__PURE__*/
styled.h2.withConfig({
  displayName: "StyledHeading",
  componentId: "sc-2f873t-0"
})(["", " ", ";color:", ";"], function (_ref) {
  var service = _ref.service;
  return getSansRegular(service);
}, function (_ref2) {
  var script = _ref2.script;
  return script && getTrafalgar(script);
}, C_SHADOW);
var StyledSection =
/*#__PURE__*/
styled.section.attrs(function (props) {
  return {
    'aria-labelledby': props.labelId,
    role: 'region'
  };
}).withConfig({
  displayName: "StyledSection",
  componentId: "sc-2f873t-1"
})([""]);

var MostReadTitle = function MostReadTitle(_ref3) {
  var header = _ref3.header,
      service = _ref3.service,
      script = _ref3.script,
      dir = _ref3.dir,
      _ref3$labelId = _ref3.labelId,
      labelId = _ref3$labelId === void 0 ? MOST_READ_LABEL : _ref3$labelId;
  return React.createElement(StyledSection, {
    labelId: labelId
  }, React.createElement(StyledHeading, {
    dir: dir,
    id: labelId,
    script: script,
    service: service
  }, header));
};

MostReadTitle.propTypes = {
  header: string.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']),
  labelId: string
};
MostReadTitle.defaultProps = {
  dir: 'ltr',
  labelId: MOST_READ_LABEL
};
export default MostReadTitle;