import React from 'react';
import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import Post from '.';
import samplePost from './fixture';

describe('Post', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Timestamp', () => {
    it('Shows timestamp as a stamp for articles over 10 hours old.', async () => {
      const { container } = await act(async () => {
        const postData = {
          ...samplePost,
          dates: {
            firstPublished: '2023-04-28T10:33:09+00:00',
            lastPublished: '2023-04-28T10:33:09+00:00',
            time: null,
            curated: '2023-04-28T10:33:10.293Z',
          },
        };

        return render(<Post post={postData} />, {
          service: 'pidgin',
        });
      });

      const time = container.querySelector('time');
      expect(time?.textContent).toEqual(
        'New Informate 28th April 2023, 11:33 WAT',
      );
    });

    it('Shows timestamp as a relative time for articles under 10 hours old.', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-04-28T10:35:10.293Z'));
      const { container } = await act(async () => {
        const postData = {
          ...samplePost,
          dates: {
            firstPublished: '2023-04-28T10:33:09+00:00',
            lastPublished: '2023-04-28T10:33:09+00:00',
            time: null,
            curated: '2023-04-28T10:33:10.293Z',
          },
        };

        return render(<Post post={postData} />, {
          service: 'pidgin',
        });
      });
      const time = container.querySelector('time');
      expect(time?.textContent).toEqual('New Informate 2 minutes wey don pass');
    });
  });
});
