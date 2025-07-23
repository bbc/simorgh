import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import ReadTime from '.';

describe('ReadTime', () => {
  it('should render when readTime is supplied', () => {
    const readTimeValue = 4;
    const { getByText } = render(<ReadTime readTime={readTimeValue} />);
    expect(getByText('Estimated Read Time: 4 minutes')).toBeInTheDocument();
  });
  it('should not render when readTime is undefined', () => {
    const readTimeValue = NaN;
    const { container } = render(<ReadTime readTime={readTimeValue} />);
    expect(container).toBeEmptyDOMElement();
  });
});
