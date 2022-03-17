import _styled from '@emotion/styled-base';

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
import { node } from 'prop-types';
import { getPica } from '#legacy/gel-foundations/typography';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';
import { C_METAL } from '#legacy/psammead-styles/colours';
import SeriesStackIcon from '../icons/series-stack';

var CallToActionText = _styled('span', {
  target: 'e12swi770',
  label: 'CallToActionText',
})(
  function (_ref) {
    var script = _ref.script;
    return getPica(script);
  },
  ';',
  function (_ref2) {
    var service = _ref2.service;
    return getSansRegular(service);
  },
  ';color:',
  C_METAL,
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtY2FsbC10by1hY3Rpb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVvQyIsImZpbGUiOiIuLi8uLi9zcmMvY29tcG9uZW50cy9jYXJkLWNhbGwtdG8tYWN0aW9uLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBub2RlIH0gZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGdldFBpY2EgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgQ19NRVRBTCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuXG5pbXBvcnQgU2VyaWVzU3RhY2tJY29uIGZyb20gJy4uL2ljb25zL3Nlcmllcy1zdGFjayc7XG5cbmNvbnN0IENhbGxUb0FjdGlvblRleHQgPSBzdHlsZWQuc3BhbmBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gZ2V0UGljYShzY3JpcHQpfTtcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfTtcbiAgY29sb3I6ICR7Q19NRVRBTH07XG5gO1xuY29uc3QgQ2FyZENhbGxUb0FjdGlvbiA9ICh7IGNoaWxkcmVuLCAuLi5wcm9wcyB9KSA9PiAoXG4gIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgIDxTZXJpZXNTdGFja0ljb24gLz5cbiAgICA8Q2FsbFRvQWN0aW9uVGV4dCB7Li4ucHJvcHN9PntjaGlsZHJlbn08L0NhbGxUb0FjdGlvblRleHQ+XG4gIDwvc3Bhbj5cbik7XG5cbkNhcmRDYWxsVG9BY3Rpb24ucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FyZENhbGxUb0FjdGlvbjtcbiJdfQ== */'),
);

var CardCallToAction = function CardCallToAction(_ref3) {
  var children = _ref3.children,
    props = _objectWithoutProperties(_ref3, ['children']);

  return /*#__PURE__*/ React.createElement(
    'span',
    {
      'aria-hidden': 'true',
    },
    /*#__PURE__*/ React.createElement(SeriesStackIcon, null),
    /*#__PURE__*/ React.createElement(CallToActionText, props, children),
  );
};

CardCallToAction.propTypes = {
  children: node.isRequired,
};
export default CardCallToAction;
