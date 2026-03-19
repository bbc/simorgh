/* eslint-disable no-template-curly-in-string */
import {
  bylineSamplePost,
  bylineSamplePostWithoutAuthorName,
  bylineSamplePostWithUnsupportedImage,
} from 'simorgh-nextjs/pages/[service]/live/[id]/Post/fixture';
import {
  render,
  screen,
  within,
} from '../react-testing-library-with-providers';
import Byline from '.';
import ArticleTimestamp from '../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNoAuthor,
  bylineWithNameAndRole,
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithNonPngPhoto,
  bylineWithPngPhoto,
} from '../../pages/ArticlePage/fixtureData';
import filterForBlockType from '../../lib/utilities/blockHandlers';

describe('Byline', () => {
  describe('Article Page', () => {
    it('Should render Byline correctly when only required data is passed', () => {
      render(<Byline blocks={bylineWithNameAndRole} />);

      const author = screen.getByText('Single Byline (all values)');
      const role = screen.getByText('Test');

      expect(author).toBeInTheDocument();
      expect(role).toBeInTheDocument();
    });

    it('Should return null when there is no author in the data', () => {
      const { container } = render(<Byline blocks={bylineWithNoAuthor} />);

      expect(container).toBeEmptyDOMElement();
    });

    it('should render Byline correctly when passed TopicUrl links', () => {
      render(<Byline blocks={bylineWithLink} />);

      const AuthorLink = screen.getByText('Single Byline (all values)');
      const Links = screen.getAllByRole('link');

      expect(AuthorLink).toBeInTheDocument();
      expect(Links.length).toBe(1);
      expect(Links[0]).toHaveAttribute('href', '/news/topics/c8qx38nq177t');
    });

    it('should render a section with role region', () => {
      render(<Byline blocks={bylineWithNameAndRole} />);

      const region = screen.getByRole('region');

      expect(region).toBeInTheDocument();
    });

    it('should render a list when required data is passed correctly', () => {
      render(<Byline blocks={bylineWithNameAndRole} />);

      const [list] = screen.getAllByRole('list');

      expect(list).toBeInTheDocument();
    });

    it('should render all listitems correctly', () => {
      render(<Byline blocks={bylineWithPngPhoto} />);

      const [firstContributor] = screen.getAllByRole('list');
      const firstContributorItems =
        within(firstContributor).getAllByRole('listitem');

      expect(firstContributorItems.length).toBe(5);
    });

    it('should correctly use the buildIChefURL function to create the image url', () => {
      render(<Byline blocks={bylineWithPngPhoto} />);

      const imageSrc = screen.getByRole('presentation');

      expect(imageSrc).toHaveAttribute(
        'src',
        'https://ichef.bbci.co.uk/ace/ws/160/cpsprodpb/f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png.webp',
      );
    });

    it('should render one image in the byline', () => {
      render(<Byline blocks={bylineWithPngPhoto} />);

      const image = screen.getAllByRole('presentation');

      expect(image.length).toBe(1);
    });

    it('should not render an image if a png photo is not used', () => {
      render(<Byline blocks={bylineWithNonPngPhoto} />);

      const image = screen.queryByRole('presentation');

      expect(image).toBeNull();
    });

    it('should correctly render Timestamp when passed as a child', () => {
      render(
        <Byline blocks={bylineWithNameAndRole}>
          <ArticleTimestamp
            firstPublished={1660658887}
            lastPublished={1660658887}
            popOut={false}
          />
        </Byline>,
      );

      const timestamp = screen.getByText('20 January 1970');

      expect(timestamp).toBeInTheDocument();
    });
    it('should correctly render an extra listitem for Timestamp', () => {
      render(
        <Byline blocks={bylineWithNameAndRole}>
          <ArticleTimestamp
            firstPublished={1660658887}
            lastPublished={1660658887}
            popOut={false}
          />
        </Byline>,
      );

      const listItems = screen.getAllByRole('listitem');

      expect(listItems.length).toBe(4);
    });

    it('should render the Byline correctly with location, image and links', () => {
      render(<Byline blocks={bylineWithPngPhoto} />);

      const AuthorLink = screen.getByText('Mayeni Jones');
      const Location = screen.getByText('Lagos, Nigeria');
      const Image = screen.getByRole('presentation');

      expect(AuthorLink).toBeInTheDocument();
      expect(Location).toBeInTheDocument();
      expect(Image).toBeInTheDocument();
    });

    it.each`
      expectation         | info                | text
      ${'Author'}         | ${'Author'}         | ${'Author,'}
      ${'Role'}           | ${'Role'}           | ${'Role,'}
      ${'Reporting from'} | ${'Reporting from'} | ${'Reporting from,'}
    `('should correctly announce $expectation for $info', ({ text }) => {
      render(
        <Byline blocks={bylineWithLinkAndLocation}>
          <ArticleTimestamp
            firstPublished={1660658887}
            lastPublished={1660658887}
            popOut={false}
          />
        </Byline>,
      );

      const findText = screen.getByText(text);

      expect(findText).toBeInTheDocument();
    });

    it.each`
      info               | translation
      ${'author'}        | ${'Barreessaa,'}
      ${'role'}          | ${'Gahee,'}
      ${'reportingFrom'} | ${'Gabaasni irraati,'}
    `('should translate $info announcement correctly', ({ translation }) => {
      render(
        <Byline blocks={bylineWithLinkAndLocation}>
          <ArticleTimestamp
            firstPublished={1660658887}
            lastPublished={1660658887}
            popOut={false}
          />
        </Byline>,
        {
          service: 'afaanoromoo',
        },
      );

      const findTranslation = screen.getByText(translation);

      expect(findTranslation).toBeInTheDocument();
    });
  });

  describe('Live Page', () => {
    const {
      header: {
        model: { blocks: postHeaderBlocks },
      },
    } = bylineSamplePost;
    const { model: bylineData } = filterForBlockType(
      postHeaderBlocks,
      'contributor',
    );

    it('Should render Byline correctly when only required data is passed', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: 'live' });

      const author = screen.getByText('Gahuza contributor');
      const role = screen.getByText('gahuza contributor');

      expect(author).toBeInTheDocument();
      expect(role).toBeInTheDocument();
    });

    it('Should return null when there is no author in the data', () => {
      const {
        header: {
          model: { blocks: postHeaderBlocksWithoutAuthorName },
        },
      } = bylineSamplePostWithoutAuthorName;
      const { model: bylineDataWithoutAuthorName } = filterForBlockType(
        postHeaderBlocksWithoutAuthorName,
        'contributor',
      );

      const { container } = render(
        <Byline blocks={[bylineDataWithoutAuthorName]} />,
        {
          pageType: 'live',
        },
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should render a section with role region', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: 'live' });

      const region = screen.getByRole('region');

      expect(region).toBeInTheDocument();
    });

    it('should render a list when required data is passed correctly', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: 'live' });

      const [list] = screen.getAllByRole('list');

      expect(list).toBeInTheDocument();
    });

    it('should render all listitems correctly', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: 'live' });

      const [firstContributor] = screen.getAllByRole('list');
      const firstContributorItems =
        within(firstContributor).getAllByRole('listitem');

      expect(firstContributorItems.length).toBe(3);
    });

    it('should correctly use the buildIChefURL function to create the image url', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: 'live' });

      const imageSrc = screen.getByRole('presentation');

      expect(imageSrc).toHaveAttribute(
        'src',
        'https://ichef.bbci.co.uk/ace/ws/160/cpsdevpb/vivo/test/images/2016/12/12/977af52a-6eaf-481f-9a06-094860d56760.jpg.webp',
      );
    });

    it('should not render an image if a png photo is not used', () => {
      const {
        header: {
          model: { blocks: postHeaderBlocksWithUnsupportedImage },
        },
      } = bylineSamplePostWithUnsupportedImage;
      const { model: bylineDataWithUnsupportedImage } = filterForBlockType(
        postHeaderBlocksWithUnsupportedImage,
        'contributor',
      );

      render(<Byline blocks={[bylineDataWithUnsupportedImage]} />, {
        pageType: 'live',
      });

      const image = screen.queryByRole('presentation');

      expect(image).toBeNull();
    });

    it.each`
      expectation | info        | text
      ${'Author'} | ${'Author'} | ${'Author,'}
      ${'Role'}   | ${'Role'}   | ${'Role,'}
    `('should correctly announce $expectation for $info', ({ text }) => {
      render(<Byline blocks={[bylineData]} />, { pageType: 'live' });

      const findText = screen.getByText(text);

      expect(findText).toBeInTheDocument();
    });

    it.each`
      info        | translation
      ${'author'} | ${'Barreessaa,'}
      ${'role'}   | ${'Gahee,'}
    `('should translate $info announcement correctly', ({ translation }) => {
      render(<Byline blocks={[bylineData]} />, {
        pageType: 'live',
        service: 'afaanoromoo',
      });

      const findTranslation = screen.getByText(translation);

      expect(findTranslation).toBeInTheDocument();
    });
  });
});
