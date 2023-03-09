import React from 'react';
import withRUM from '#containers/PageHandlers/withRUM';
import { render, waitFor } from '@testing-library/react';

describe('withRum', () => {
  const Component = () => <h1>test</h1>;
  const RumHoc = withRUM(Component);

  it('should add RUM on canonical', async () => {
    render(<RumHoc />);
    await waitFor(() => {
      const scriptEl = document.querySelector('script');
      expect(scriptEl).toBeInTheDocument();
      expect(scriptEl.src).toEqual(
        'https://static.files.bbci.co.uk/ws/simorgh-assets/public/vendor/cwr.js',
      );
    });
  });
});
