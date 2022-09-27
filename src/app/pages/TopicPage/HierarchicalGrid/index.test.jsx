import React from 'react';
import { render } from '@testing-library/react';

import fixture from './fixtures';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

import HierarchicalGrid from '.';

const renderComponent = ({ service = 'pidgin', summaries = fixture } = {}) =>
  render(
    <ServiceContextProvider service={service}>
      <HierarchicalGrid summaries={summaries} />
    </ServiceContextProvider>,
  );

describe('Hierarchical Grid Curation', () => {
  it('renders twelve promos when twelve items are provided', async () => {
    renderComponent({});

    expect(document.querySelectorAll('li').length).toBe(12);
  });

  it('renders twelve promos when more than twelve items are provided', async () => {
    const extraSummaries = fixture.concat({
      title: 'Wetin happun for January 6 one year ago?',
      type: 'article',
      firstPublished: '2022-01-06T19:00:29.000Z',
      link: 'https://www.bbc.com/pidgin/tori-59901959',
      imageUrl:
        'https://ichef.bbci.co.uk/news/{width}/cpsprodpb/DE3A/production/_122609865_january6timelinewetinhappunforjanuary6oneyearago.jpg',
      description:
        'Here na reminder of wetin happun on di historic day when rioters storm di Capitol exactly one year ago.',
      imageAlt: 'January 6 timeline: Wetin happun for January 6 one year ago?',
      id: 'e2263a1c-8d5a-4a73-a00c-881acfa34381',
    });
    renderComponent({ summaries: extraSummaries });

    expect(document.querySelectorAll('li').length).toBe(12);
  });

  it('returns null when less than three promos are in the data', async () => {
    renderComponent({
      summaries: fixture.splice(0, 2),
    });

    expect(document.querySelectorAll('li').length).toBe(0);
  });
});
describe('a11y', () => {
  it('should render list with role of list', async () => {
    renderComponent({});

    expect(document.querySelectorAll('ul').length).toBe(1);
    expect(document.querySelector('ul').getAttribute('role')).toBe('list');
  });
});
