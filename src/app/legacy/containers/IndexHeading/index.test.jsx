import React from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
import IndexHeading from '.';

describe('Index Heading', () => {
  describe('snapshot', () => {
    it('should render correctly for IDX', () => {
      const { container } = render(<IndexHeading>Index Heading</IndexHeading>, {
        service: 'ukrainian',
      });
      expect(container).toMatchSnapshot();
    });

    it('should render rtl correctly for IDX', () => {
      const { container } = render(<IndexHeading>Index Heading</IndexHeading>, {
        service: 'arabic',
      });
      expect(container).toMatchSnapshot();
    });
  });
});
