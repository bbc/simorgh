import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import ReadTime from '.';

describe('ReadTime', () => {
  it('should render when readTime is supplied', () => {
    const { getByText } = render(<ReadTime readTime={4} />);
    expect(getByText('Estimated Read Time: 4 minutes')).toBeInTheDocument();
  });
  it('should not render when readTime is undefined', () => {
    const { container } = render(<ReadTime />);
    expect(container).toBeEmptyDOMElement();
  });
});
