import React from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import IndexHeading from '.';

const IndexHeadingWithContext = (service, pageType) => (
  <ServiceContextProvider service={service}>
    <IndexHeading pageType={pageType}>Index Heading</IndexHeading>
  </ServiceContextProvider>
);

describe('Index Heading', () => {
  describe('snapshot', () => {
    it('should render correctly for IDX', () => {
      const { container } = render(IndexHeadingWithContext('ukrainian'));
      expect(container).toMatchSnapshot();
    });

    it('should render rtl correctly for IDX', () => {
      const { container } = render(IndexHeadingWithContext('arabic'));
      expect(container).toMatchSnapshot();
    });
  });
});
