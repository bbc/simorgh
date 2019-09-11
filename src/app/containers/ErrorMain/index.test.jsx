import React from 'react';
import renderHelmet from '../../../testHelpers/renderHelmet';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ErrorMain from './index';

describe('ErrorMain', () => {
  it('should correctly render for 404', async () => {
    const html = await renderHelmet(
      <ServiceContextProvider service="news">
        <ErrorMain status={404} />
      </ServiceContextProvider>,
    );

    expect(html).toMatchSnapshot();
  });

  it('should correctly render for 500', async () => {
    const html = await renderHelmet(
      <ServiceContextProvider service="news">
        <ErrorMain status={500} />
      </ServiceContextProvider>,
    );

    expect(html).toMatchSnapshot();
  });

  it('should correctly render for other status code', async () => {
    const html = await renderHelmet(
      <ServiceContextProvider service="news">
        <ErrorMain status={123} />
      </ServiceContextProvider>,
    );

    expect(html).toMatchSnapshot();
  });

  it('should correctly render for 404 for persian', async () => {
    const html = await renderHelmet(
      <ServiceContextProvider service="persian">
        <ErrorMain status={404} />
      </ServiceContextProvider>,
    );

    expect(html).toMatchSnapshot();
  });

  it('should correctly render for 500 for persian', async () => {
    const html = await renderHelmet(
      <ServiceContextProvider service="persian">
        <ErrorMain status={500} />
      </ServiceContextProvider>,
    );

    expect(html).toMatchSnapshot();
  });
});
