import React from 'react';
import compose from 'ramda/src/compose';
import { render } from '@testing-library/react';
import {
  shouldMatchSnapshot,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import relatedItems from './relatedItems';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import IndexAlsosContainer from '.';

const withServiceContext = component => (
  <ServiceContextProvider service="hausa">{component}</ServiceContextProvider>
);

const renderWithContext = compose(render, withServiceContext);
const shouldMatchSnapshotWithContext = (title, component) =>
  shouldMatchSnapshot(title, withServiceContext(component));

describe('Index Alsos', () => {
  suppressPropWarnings(['alsoItems', 'IndexAlsosContainer']);
  describe('Snapshots', () => {
    shouldMatchSnapshotWithContext(
      'should render multiple correctly',
      <IndexAlsosContainer
        alsoItems={relatedItems}
        script={latin}
        service="news"
      />,
    );

    shouldMatchSnapshotWithContext(
      'should render one correctly',
      <IndexAlsosContainer
        alsoItems={[relatedItems[0]]}
        script={latin}
        service="news"
      />,
    );
  });

  describe('Assertions', () => {
    describe('It links to a CPS asset', () => {
      it('should render a regular headline', () => {
        const { container } = renderWithContext(
          <IndexAlsosContainer
            alsoItems={relatedItems}
            script={latin}
            service="news"
          />,
        );

        const firstListItem = container.querySelector('li');
        const headline =
          firstListItem.getElementsByTagName('span')[2].innerHTML;
        expect(headline).toEqual('APC ba ta isa ta kore ni ba – Buba Galadima');
      });

      it('should render an overtyped headline', () => {
        const { container } = renderWithContext(
          <IndexAlsosContainer
            alsoItems={relatedItems}
            script={latin}
            service="news"
          />,
        );

        const secondListItem = container.querySelectorAll('li')[1];
        const headline =
          secondListItem.getElementsByTagName('span')[0].innerHTML;
        expect(headline).toEqual('Overtyped headline');
      });

      it('should render a CPS url', () => {
        const { container } = renderWithContext(
          <IndexAlsosContainer
            alsoItems={relatedItems}
            script={latin}
            service="news"
          />,
        );

        const firstListItem = container.querySelector('li');
        const url = firstListItem.getElementsByTagName('a')[0].pathname;
        expect(url).toEqual('/hausa/labarai-48916590');
      });
    });

    describe('It links to a url', () => {
      it('should render a promo headline', () => {
        const { container } = renderWithContext(
          <IndexAlsosContainer
            alsoItems={relatedItems}
            script={latin}
            service="news"
          />,
        );

        const thirdListItem = container.querySelectorAll('li')[2];
        const headline =
          thirdListItem.getElementsByTagName('span')[0].innerHTML;
        expect(headline).toEqual('Promo link in Index Alsos');
      });

      it('should render a promo hyperlink', () => {
        const { container } = renderWithContext(
          <IndexAlsosContainer
            alsoItems={relatedItems}
            script={latin}
            service="news"
          />,
        );

        const thirdListItem = container.querySelectorAll('li')[2];
        const url = thirdListItem.getElementsByTagName('a')[0].href;
        expect(url).toEqual('https://www.bbc.com/persian');
      });
    });
  });
});
