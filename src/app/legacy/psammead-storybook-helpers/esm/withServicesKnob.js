import React from 'react';
import path from 'ramda/src/path';
import { Helmet } from 'react-helmet';
import { select } from '@storybook/addon-knobs';
import * as scripts from '#legacy/gel-foundations/scripts';
import TEXT_VARIANTS from './text-variants';
var DEFAULT_SERVICE = 'news';
var SERVICES_LIST = Object.keys(TEXT_VARIANTS);

var getVariant = function getVariant(selectedService) {
  return path([selectedService, 'variant']);
};

var getService = function getService(selectedService) {
  return path([selectedService, 'service']);
};

var includesService = function includesService(services) {
  return function (service) {
    return services.includes(service);
  };
};

export default (function () {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$defaultService = _ref.defaultService,
    defaultService =
      _ref$defaultService === void 0 ? DEFAULT_SERVICE : _ref$defaultService,
    _ref$services = _ref.services,
    services = _ref$services === void 0 ? SERVICES_LIST : _ref$services;

  return function (storyFn) {
    var selectedService = select(
      'Select a service',
      services.filter(includesService(services)),
      defaultService,
    );
    var variant = getVariant(selectedService)(TEXT_VARIANTS);
    var service = variant
      ? getService(selectedService)(TEXT_VARIANTS)
      : selectedService;
    var _TEXT_VARIANTS$select = TEXT_VARIANTS[selectedService],
      text = _TEXT_VARIANTS$select.text,
      articlePath = _TEXT_VARIANTS$select.articlePath,
      longText = _TEXT_VARIANTS$select.longText,
      script = _TEXT_VARIANTS$select.script,
      locale = _TEXT_VARIANTS$select.locale,
      _TEXT_VARIANTS$select2 = _TEXT_VARIANTS$select.dir,
      dir = _TEXT_VARIANTS$select2 === void 0 ? 'ltr' : _TEXT_VARIANTS$select2,
      _TEXT_VARIANTS$select3 = _TEXT_VARIANTS$select.timezone,
      timezone =
        _TEXT_VARIANTS$select3 === void 0 ? 'GMT' : _TEXT_VARIANTS$select3,
      brandBackgroundColour = _TEXT_VARIANTS$select.brandBackgroundColour,
      brandForegroundColour = _TEXT_VARIANTS$select.brandForegroundColour,
      brandBorderColour = _TEXT_VARIANTS$select.brandBorderColour,
      brandHighlightColour = _TEXT_VARIANTS$select.brandHighlightColour;
    var storyProps = {
      text: text,
      articlePath: articlePath,
      longText: longText,
      script: scripts[script],
      locale: locale,
      dir: dir,
      service: service,
      variant: variant || 'default',
      selectedService: selectedService,
      timezone: timezone,
      brandBackgroundColour: brandBackgroundColour,
      brandForegroundColour: brandForegroundColour,
      brandBorderColour: brandBorderColour,
      brandHighlightColour: brandHighlightColour,
    };
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(Helmet, {
        htmlAttributes: {
          dir: dir,
        },
      }),
      storyFn(storyProps),
    );
  };
});
