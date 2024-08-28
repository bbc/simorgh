import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import MostReadSectionLabel from '.';

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
    expect(container).toMatchSnapshot();
  });
});
