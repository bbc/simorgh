import { render } from '@testing-library/react';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import ScrollDepthTracking from '.';

jest.mock('#hooks/useOptimizelyScrollDepth');

describe('ScrollDepthTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls useOptimizelyScrollDepth on render', () => {
    render(<ScrollDepthTracking />);
    expect(useOptimizelyScrollDepth).toHaveBeenCalled();
  });
});
