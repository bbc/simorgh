import React from 'react';
import ReadTime from '.';
import { render } from '#app/components/react-testing-library-with-providers';
import { statsWithReadTime } from './fixtures';

describe('ReadTime', () => {
  it('should render when readTimeValue is supplied', () => {
    const readTimeValue = statsWithReadTime.readTime;
    const { getByText } = render(<ReadTime readTimeValue={readTimeValue} />);
    expect(getByText('read time: 4 minutes')).toBeInTheDocument();
  });
  it('should not render when readTimeValue is undefined', () => {
    const readTimeValue = undefined;
    const { container } = render(<ReadTime readTimeValue={readTimeValue} />);
    expect(container).toBeEmptyDOMElement();
  });
});