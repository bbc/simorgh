import React from 'react';
import { render, act } from '@testing-library/react';
import dariRadioScheduleData from '#data/persian/bbc_dari_radio/schedule.json';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import persianMostReadData from '#data/persian/mostRead';
import IdxPageWithContext from './testHelpers';

describe('IdxPage', () => {
  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify(persianMostReadData));
    fetch.mockResponse(JSON.stringify(dariRadioScheduleData));
  });

  describe('Snapshots', () => {
    it('should render a persian idx page correctly with most read and radio schedule', async () => {
      let container = null;
      await act(async () => {
        container = render(
          <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
        ).container;
      });

      expect(container).toMatchSnapshot();
    });

    it('should render idx page sections', async () => {
      let container = null;
      await act(async () => {
        container = render(
          <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
        ).container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(3);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
