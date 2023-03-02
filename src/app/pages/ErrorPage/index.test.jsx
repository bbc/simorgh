import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ErrorPage from './ErrorPage';
import ThemeProvider from '../../components/ThemeProvider';

jest.mock('../../components/ThemeProvider');

const ErrorPage404 = ({
  /* eslint-disable react/prop-types */
  service,
  /* eslint-enable react/prop-types */
}) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>
  </ThemeProvider>
);

const ErrorPage500 = ({
  /* eslint-disable react/prop-types */
  service,
  /* eslint-enable react/prop-types */
}) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>
  </ThemeProvider>
);

const ErrorPageOtherCode = ({
  /* eslint-disable react/prop-types */
  service,
  /* eslint-enable react/prop-types */
}) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <ErrorPage errorCode={123} />
    </ServiceContextProvider>
  </ThemeProvider>
);

describe('ErrorPage', () => {
  it('should correctly render for 404', async () => {
    const { container } = render(<ErrorPage404 service="news" />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for 500', async () => {
    const { container } = render(<ErrorPage500 service="news" />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for other status code', async () => {
    const { container } = render(<ErrorPageOtherCode service="news" />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for 404 for persian', async () => {
    const { container } = render(<ErrorPage404 service="persian" />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should correctly render for 500 for persian', async () => {
    const { container } = render(<ErrorPage500 service="persian" />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
