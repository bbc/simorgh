import { render } from '../../react-testing-library-with-providers';
import { PromoSingleBlock, oneLinkWithTimestamp } from '../helpers/fixtureData';
import Promo from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

const ArticleLinksBlock = ({ block, experimentVariant }) => (
  <ServiceContextProvider service="pidgin">
    <Promo
      block={block}
      onClick={() => {}}
      experimentVariant={experimentVariant}
    />
  </ServiceContextProvider>
);

describe('Article Links Block', () => {
  it('should render a link', () => {
    const { queryByRole } = render(
      <ArticleLinksBlock block={PromoSingleBlock} />,
    );
    expect(queryByRole('link')).toBeInTheDocument();
  });

  it('should extract and render the correct title', () => {
    const { getByText } = render(
      <ArticleLinksBlock block={PromoSingleBlock} />,
    );
    expect(
      getByText(
        'This is a very long headline. I am creating this for a test purpose. I love creating these type of tests. I really do not know what to write.',
      ),
    ).toBeTruthy();
  });

  it('should extract and render the correct href', () => {
    const { queryByRole } = render(
      <ArticleLinksBlock block={PromoSingleBlock} />,
    );
    expect(queryByRole('link').href).toEqual('https://www.bbc.com/mundo');
  });

  it('should render timestamp if timestamp is available', () => {
    const { container } = render(
      <ArticleLinksBlock block={oneLinkWithTimestamp[0]} />,
    );
    expect(container.getElementsByTagName('time')[0]).toBeInTheDocument();
  });
});
