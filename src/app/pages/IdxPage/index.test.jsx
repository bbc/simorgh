import React from 'react';
import { render } from '@testing-library/react';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import IdxPageWithContext from './testHelpers';

describe('IdxPage', () => {
  describe('Snapshots', () => {
    it('should render an IDX page correctly', () => {
      const container = render(
        <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render idx page sections', async () => {
      const { container } = render(
        <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
      );

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(2);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
