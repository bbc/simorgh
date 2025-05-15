import React from 'react';
import { Helmet } from 'react-helmet';
import { render } from '#app/components/react-testing-library-with-providers';
import * as boilerplate from './amp-boilerplate';

const JS_SCRIPT_TAGS = {
  AMP_ACCESS_JS: boilerplate.AMP_ACCESS_JS,
  AMP_ANALYTICS_JS: boilerplate.AMP_ANALYTICS_JS,
  AMP_BIND_JS: boilerplate.AMP_BIND_JS,
  AMP_CONSENT_JS: boilerplate.AMP_CONSENT_JS,
  AMP_GEO_JS: boilerplate.AMP_GEO_JS,
  AMP_LIST_JS: boilerplate.AMP_LIST_JS,
  AMP_MUSTACHE_JS: boilerplate.AMP_MUSTACHE_JS,
  AMP_ADS_JS: boilerplate.AMP_ADS_JS,
  AMP_AD: boilerplate.AMP_AD,
  AMP_SCRIPT_JS: boilerplate.AMP_SCRIPT_JS,
};

describe('AMP Boilerplate', () => {
  describe('styles', () => {
    it('should render AMP Script', () => {
      const { container } = render(boilerplate.AMP_SCRIPT);
      expect(container).toMatchSnapshot();
    });

    it('should render AMP NoScript', () => {
      const { container } = render(boilerplate.AMP_NO_SCRIPT);
      expect(container).toMatchSnapshot();
    });
  });
  describe('JavaScript', () => {
    it.each(Object.keys(JS_SCRIPT_TAGS))('should render %s', key => {
      render(<Helmet>{JS_SCRIPT_TAGS[key]}</Helmet>);

      expect(Helmet.peek().scriptTags[0]).toMatchSnapshot();
    });
  });
});
