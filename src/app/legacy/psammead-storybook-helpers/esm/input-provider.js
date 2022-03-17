import React from 'react';
import { select } from '@storybook/addon-knobs';
import { Helmet } from 'react-helmet';
import { arrayOf, shape, string, element } from 'prop-types';
import * as scripts from '#legacy/gel-foundations/scripts';
import LANGUAGE_VARIANTS from './text-variants';

var inputProvider = function inputProvider(_ref) {
  var slots = _ref.slots,
    componentFunction = _ref.componentFunction,
    services = _ref.services,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options;
  return function () {
    var serviceNames = Object.keys(LANGUAGE_VARIANTS);

    if (services) {
      serviceNames = serviceNames.filter(function (service) {
        return services.includes(service);
      });
    }

    var serviceName = select(
      'Select a service',
      serviceNames,
      options.defaultService || 'news',
    );
    var service = LANGUAGE_VARIANTS[serviceName];
    var isNews = serviceName === 'news';
    var slotTexts = (slots || []).map(function (_ref2) {
      var defaultText = _ref2.defaultText;
      // Expect defaultText to be in English. When it is provided and we're
      // displaying English language on the story, set the default text for
      // this knob to defaultText.
      // When we switch to a language other than English, set the
      // text for the slot to the snippet from LANGUAGE_VARIANTS for that
      // language.
      return defaultText && isNews ? defaultText : service.text;
    });
    var script = scripts[service.script];
    var dir = service.dir || 'ltr';
    var locale = service.locale;
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Helmet, {
        htmlAttributes: {
          dir: dir,
        },
      }),
      componentFunction({
        slotTexts: slotTexts,
        script: script,
        dir: dir,
        locale: locale,
        service: serviceName,
      }),
    );
  };
};

inputProvider.propTypes = {
  slots: arrayOf(
    shape({
      name: string,
      defaultText: string,
    }),
  ),
  componentFunction: element,
  services: arrayOf(string),
  options: shape({
    defaultService: string,
  }),
};
export default inputProvider;
