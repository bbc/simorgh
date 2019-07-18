import React from 'react';
import { render } from '@testing-library/react';

import { shouldShallowMatchSnapshot } from '../../../../testHelpers';
import LinkContents from '.';

const item = {
  cpsType: 'STY',
  headlines: {
    headline: 'A headline',
  },
};

const itemWithOvertypedHeadline = {
  cpsType: 'STY',
  headlines: {
    headline: 'A headline',
    overtyped: 'Overtyped headline',
  },
};

const mediaItem = {
  cpsType: 'MAP',
  headlines: {
    headline: 'A headline for a media item',
  },
  media: {
    format: 'audio',
    versions: [
      {
        duration: 666,
      },
    ],
  },
};

const mediaItemWithOvertyped = { ...mediaItem };
mediaItemWithOvertyped.headlines.overtyped =
  'An overtyped headline for a media item';

const mockServiceConfig = {
  translations: {
    media: {
      audio: 'AUDIO',
      video: 'VIDEO',
    },
  },
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});
const { useContext } = jest.requireMock('react');

describe('Story Promo Link Contents', () => {
  beforeEach(() => {
    useContext.mockReturnValue(mockServiceConfig);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  it("should render a story's headline as bare text", () => {
    const { container } = render(<LinkContents item={item} />);

    expect(container.innerHTML).toEqual(item.headlines.headline);
  });

  it('should render overtyped headline if provided', () => {
    const { container } = render(
      <LinkContents item={itemWithOvertypedHeadline} />,
    );

    expect(container.innerHTML).toEqual(
      itemWithOvertypedHeadline.headlines.overtyped,
    );
  });

  shouldShallowMatchSnapshot(
    'should render with visually hidden text for media promos',
    <LinkContents item={mediaItem} />,
  );

  shouldShallowMatchSnapshot(
    'should render with visually hidden text for media with overtyped headline',
    <LinkContents item={mediaItemWithOvertyped} />,
  );
});
