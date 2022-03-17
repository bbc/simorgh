import React from 'react';
import { string, shape } from 'prop-types';
import DOMPurify from 'dompurify';
var DOMPURIFY_CONFIG = {
  ADD_TAGS: ['iframe']
};

var OEmbed = function OEmbed(_ref) {
  var oEmbed = _ref.oEmbed,
      className = _ref.className;
  var html = oEmbed.html;
  var sanitizedHtml = DOMPurify.sanitize(html, DOMPURIFY_CONFIG);
  return /*#__PURE__*/React.createElement("div", {
    className: className // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: sanitizedHtml
    }
  });
};

OEmbed.defaultProps = {
  className: null
};
OEmbed.propTypes = {
  oEmbed: shape({
    html: string.isRequired
  }).isRequired,
  className: string
};
export default OEmbed;