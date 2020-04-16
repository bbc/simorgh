import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import { service as hausaConfig } from '#lib/config/services/hausa';
import relatedItems from './relatedItems';
import IndexAlsosContainer from '.';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});
const { useContext } = jest.requireMock('react');

describe('Index Alsos', () => {
  beforeEach(() => {
    useContext.mockReturnValue(hausaConfig.default);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should render multiple correctly',
      <IndexAlsosContainer
        alsoItems={relatedItems}
        script={latin}
        service="news"
      />,
    );

    shouldMatchSnapshot(
      'should render one correctly',
      <IndexAlsosContainer
        alsoItems={[relatedItems[0]]}
        script={latin}
        service="news"
      />,
    );
  });

  describe('Assertions', () => {
    it('should render a regular headline', () => {
      const { container } = render(
        <IndexAlsosContainer
          alsoItems={relatedItems}
          script={latin}
          service="news"
        />,
      );

      const firstListItem = container.querySelector('li');
      const healine = firstListItem.getElementsByTagName('span')[2].innerHTML;
      expect(healine).toEqual('APC ba ta isa ta kore ni ba – Buba Galadima');
    });

    it('should render an overtyped headline', () => {
      const { container } = render(
        <IndexAlsosContainer
          alsoItems={relatedItems}
          script={latin}
          service="news"
        />,
      );

      const secondListItem = container.querySelectorAll('li')[1];
      const headline = secondListItem.getElementsByTagName('span')[0].innerHTML;
      expect(headline).toEqual('Overtyped headline');
    });
  });
});
