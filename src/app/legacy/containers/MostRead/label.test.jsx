import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import MostReadSectionLabel from './label';

describe('MostReadSectionLabel assertion', () => {
  it('should render most-read section label with correct attributes', async () => {
    const { container } = render(
      <ServiceContextProvider service="persian">
        <MostReadSectionLabel />
      </ServiceContextProvider>,
    );
    const label = container.getElementsByTagName('span')[2];
    expect(label).toHaveAttribute('id', 'Most-Read');
    expect(label.textContent).toEqual('پربیننده‌ترین‌ها');
  });
});
