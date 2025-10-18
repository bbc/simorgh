import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import MostReadSectionLabel from '.';

describe('MostReadSectionLabel assertion', () => {
  it('should render most-read section label with correct attributes', async () => {
    const { container } = render(<MostReadSectionLabel />, {
      service: 'persian',
    });
    const label = container.getElementsByTagName('span')[2];
    expect(label).toHaveAttribute('id', 'Most-Read');
    expect(label.textContent).toEqual('مطالب پرخواننده');
    expect(container).toMatchSnapshot();
  });
});
