import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ErrorPage from './ErrorPage';
import ThemeProvider from '../../components/ThemeProvider';

jest.mock('../../components/ThemeProvider');

const Context = ({
  /* eslint-disable react/prop-types */
  service,
  /* eslint-enable react/prop-types */
}) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <ErrorPage />
    </ServiceContextProvider>
  </ThemeProvider>
);

describe('ErrorPage', () => {
  it('should correctly render for 404', async () => {
    const { container } = render(
      <Context service="news">
        <ErrorPage errorCode={404} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for 500', async () => {
    const { container } = render(
      <Context service="news">
        <ErrorPage errorCode={500} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for other status code', async () => {
    const { container } = render(
      <Context service="news">
        <ErrorPage errorCode={123} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for 404 for persian', async () => {
    const { container } = render(
      <Context service="persian">
        <ErrorPage errorCode={404} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for 500 for persian', async () => {
    const { container } = render(
      <Context service="persian">
        <ErrorPage errorCode={500} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  // describe('ErrorPage', () => {
  //   shouldMatchSnapshot(
  //     'should correctly render for 404',
  //     <ThemeProvider service="news">
  //       <ServiceContextProvider service="news">
  //         <ErrorPage errorCode={404} />
  //       </ServiceContextProvider>
  //     </ThemeProvider>,
  //   );

  // shouldMatchSnapshot(
  //   'should correctly render for 500',
  //   <ServiceContextProvider service="news">
  //     <ErrorPage errorCode={500} />
  //   </ServiceContextProvider>,
  // );

  // shouldMatchSnapshot(
  //   'should correctly render for other status code',
  //   <ServiceContextProvider service="news">
  //     <ErrorPage errorCode={123} />
  //   </ServiceContextProvider>,
  // );

  // shouldMatchSnapshot(
  //   'should correctly render for 404 for persian',
  //   <ServiceContextProvider service="persian">
  //     <ErrorPage errorCode={404} />
  //   </ServiceContextProvider>,
  // );

  // shouldMatchSnapshot(
  //   'should correctly render for 500 for persian',
  //   <ServiceContextProvider service="persian">
  //     <ErrorPage errorCode={500} />
  //   </ServiceContextProvider>,
  // );
});
