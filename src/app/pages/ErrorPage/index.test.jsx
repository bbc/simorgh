import React from 'react';
import ErrorPage from './ErrorPage';
import { render } from '#components/react-testing-library-with-providers';

describe('ErrorPage', () => {
  it('should correctly render for 404', () => {
    const { container } = render(<ErrorPage errorCode={404} />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for 500', () => {
    const { container } = render(<ErrorPage errorCode={500} />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for other status code', () => {
    const { container } = render(<ErrorPage errorCode={123} />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for 404 for persian', () => {
    const { container } = render(<ErrorPage errorCode={404} />, {
      service: 'persian',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for 500 for persian', async () => {
    const { container } = render(<ErrorPage errorCode={500} />, {
      service: 'persian',
    });
    expect(container).toMatchSnapshot();
  });
});
