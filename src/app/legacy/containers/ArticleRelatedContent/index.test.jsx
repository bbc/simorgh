import React from 'react';
import { render } from '@testing-library/react';

import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';

import Component, { buildStoryPromos } from '.';

import {
  optimoRelatedContent,
  storyPromoContent,
  relatedContentBlock,
  relatedContentBlockWithTitle,
} from './fixtures';

jest.mock('../../../components/ThemeProvider');

const renderComponent = ({
  content = relatedContentBlock,
  service = 'afrique',
  variant = 'default',
} = {}) =>
  render(
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <Component content={content} />
        </ToggleContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>,
  );

describe('ArticleRelatedContent', () => {
  it('should render related content', () => {
    const { container, getByText } = renderComponent();

    expect(getByText('News homepage')).toBeInTheDocument();
    expect(
      container.querySelector('a[href="https://www.bbc.co.uk/news"]'),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render custom titles', () => {
    const { getByText } = renderComponent({
      content: relatedContentBlockWithTitle,
    });

    expect(getByText('This is my title')).toBeInTheDocument();
  });

  it('should convert optimo related content blocks to the story promo schema', () => {
    expect(buildStoryPromos(optimoRelatedContent)).toEqual(storyPromoContent);
  });

  it('should add timestamp and update headingTag in the story promo schema', () => {
    const optimoData = optimoRelatedContent;
    const timestamp = 1622753625680;

    optimoData[0].model.blocks.push({
      type: 'aresLink',
      model: {
        blocks: [
          {
            type: 'optimoLinkMetadata',
            model: {
              timestamp,
            },
          },
        ],
      },
    });

    const result = buildStoryPromos(optimoData);

    expect(result[0].headingTag).toEqual('h3');
    expect(result[0].timestamp).toEqual(timestamp);
  });
});
