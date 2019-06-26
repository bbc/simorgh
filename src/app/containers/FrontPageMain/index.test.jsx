import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import frontPageDataIgbo from '../../../../data/prod/pidgin/frontpage';
import igboConfig from '../../lib/config/services/igbo';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const { useContext } = jest.requireMock('react');

describe('FrontPageMain', () => {
  beforeEach(() => {
    useContext.mockReturnValue(igboConfig);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  describe('snapshots', () => {
    shouldShallowMatchSnapshot(
      'should render an igbo frontpage correctly',
      <FrontPageMain frontPageData={frontPageDataIgbo} />,
    );
  });

  describe('assertions', () => {
    afterEach(cleanup);

    it('should render visually hidden text as h1', () => {
      const { container } = render(
        <FrontPageMain frontPageData={frontPageDataIgbo} />,
      );
      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');

      const span = h1.querySelector('span');
      expect(span.getAttribute('role')).toEqual('text');
      expect(span.textContent).toEqual('BBC News, Ìgbò - Akụkọ');

      const langSpan = span.querySelector('span');
      expect(langSpan.getAttribute('lang')).toEqual('en-GB');
    });

    it('should render front page sections', () => {
      const { container } = render(
        <FrontPageMain frontPageData={frontPageDataIgbo} />,
      );
      const sections = container.querySelectorAll('section');

      expect(sections).toHaveLength(7);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
