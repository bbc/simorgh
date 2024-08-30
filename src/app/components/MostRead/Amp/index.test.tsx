import { FetchMock } from 'jest-fetch-mock';

import React from 'react';
import { render, act } from '../../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import AmpMostRead from '.';
import { Services } from '../../../models/types/global';
import { data as mundoMostReadResponse } from '../../../../../data/mundo/mostRead/mundo.json';

interface MostReadAmpWithContextProps {
  service: Services;
}

const MostReadAmpWithContext = ({ service }: MostReadAmpWithContextProps) => (
  <ServiceContextProvider service={service}>
    <AmpMostRead endpoint="/mundo/mostread.json" />
  </ServiceContextProvider>
);

const fetchMock = fetch as FetchMock;

describe('AmpMostRead', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  // Testing is done in cypress as jest dom does not support/run web workers which run the amp-scripts.

  it('should render as expected', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mundoMostReadResponse));

    const { container } = render(<MostReadAmpWithContext service="mundo" />, {
      service: 'mundo',
    });

    await act(async () => {
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it('should render fallback when fetch fails to load', async () => {
    fetchMock.mockReject(Error('failed fetch'));

    const { container, getByText } = render(
      <MostReadAmpWithContext service="mundo" />,
      {
        service: 'mundo',
      },
    );

    await act(async () => {
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();

      const fallback = getByText('Contenido no disponible');

      expect(fallback).not.toBeNull();
    });
  });

  it('should render fallback when items are empty', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        generated: '2022-05-03T14:44:35.496Z',
        lastRecordTimeStamp: '2022-05-03T14:42:00Z',
        firstRecordTimeStamp: '2022-05-03T14:27:00Z',
        items: [],
      }),
    );

    const { container, getByText } = render(
      <MostReadAmpWithContext service="mundo" />,
      {
        service: 'mundo',
      },
    );

    await act(async () => {
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();

      const fallback = getByText('Contenido no disponible');

      expect(fallback).not.toBeNull();
    });
  });

  it('should render fallback when items are undefined', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        generated: '2022-05-03T14:44:35.496Z',
        lastRecordTimeStamp: '2022-05-03T14:42:00Z',
        firstRecordTimeStamp: '2022-05-03T14:27:00Z',
      }),
    );

    const { container, getByText } = render(
      <MostReadAmpWithContext service="mundo" />,
      {
        service: 'mundo',
      },
    );

    await act(async () => {
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();

      const fallback = getByText('Contenido no disponible');

      expect(fallback).not.toBeNull();
    });
  });
});
