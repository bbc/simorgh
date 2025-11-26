import { render } from '../../../components/react-testing-library-with-providers';
import IndexHeading from '.';

const IndexHeadingWithContext = () => (
  <IndexHeading>Index Heading</IndexHeading>
);

describe('Index Heading', () => {
  describe('snapshot', () => {
    it('should render correctly for IDX', () => {
      const { container } = render(<IndexHeadingWithContext />, {
        service: 'ukrainian',
      });
      expect(container).toMatchSnapshot();
    });

    it('should render rtl correctly for IDX', () => {
      const { container } = render(<IndexHeadingWithContext />, {
        service: 'arabic',
      });
      expect(container).toMatchSnapshot();
    });
  });
});
