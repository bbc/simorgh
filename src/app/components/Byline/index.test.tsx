import {
  ARTICLE_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  bylineSamplePost,
  bylineSamplePostWithoutAuthorName,
  bylineSamplePostWithUnsupportedImage,
} from '../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/fixture';
import ArticleTimestamp from '../../legacy/containers/ArticleTimestamp';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import {
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithNameAndRole,
  bylineWithNoAuthor,
  bylineWithNonPngPhoto,
  bylineWithPngPhoto,
} from '../../pages/ArticlePage/fixtureData';
import {
  render,
  screen,
  within,
} from '../react-testing-library-with-providers';
import Byline from '.';

describe('Byline', () => {
  describe.each([
    { name: 'Story Page', pageType: STORY_PAGE },
    { name: 'Article Page', pageType: ARTICLE_PAGE },
    { name: 'Media Article Page', pageType: MEDIA_ARTICLE_PAGE },
    { name: 'Media Asset Page', pageType: MEDIA_ASSET_PAGE },
    { name: 'Photo Gallery Page', pageType: PHOTO_GALLERY_PAGE },
  ])('$name', ({ pageType }) => {
    it('Should render Byline correctly when only required data is passed', () => {
      render(<Byline blocks={bylineWithNameAndRole} />, { pageType });

      const author = screen.getByText('Single Byline (all values)');
      const role = screen.getByText('Test');

      expect(author).toBeInTheDocument();
      expect(role).toBeInTheDocument();
    });

    it('Should return null when there is no author in the data', () => {
      const { container } = render(<Byline blocks={bylineWithNoAuthor} />, {
        pageType,
      });

      expect(container).toBeEmptyDOMElement();
    });

    it('should render Byline correctly when passed TopicUrl links', () => {
      render(<Byline blocks={bylineWithLink} />, { pageType });

      const AuthorLink = screen.getByText('Single Byline (all values)');
      const Links = screen.getAllByRole('link');

      expect(AuthorLink).toBeInTheDocument();
      expect(Links.length).toBe(1);
      expect(Links[0]).toHaveAttribute('href', '/news/topics/c8qx38nq177t');
    });

    it('should render a section with role region', () => {
      render(<Byline blocks={bylineWithNameAndRole} />, { pageType });

      const region = screen.getByRole('region');

      expect(region).toBeInTheDocument();
    });

    it('should render a list when required data is passed correctly', () => {
      render(<Byline blocks={bylineWithNameAndRole} />, { pageType });

      const [list] = screen.getAllByRole('list');

      expect(list).toBeInTheDocument();
    });

    it('should render all listitems correctly', () => {
      render(<Byline blocks={bylineWithPngPhoto} />, { pageType });

      const [firstContributor] = screen.getAllByRole('list');
      const firstContributorItems =
        within(firstContributor).getAllByRole('listitem');

      expect(firstContributorItems.length).toBe(5);
    });

    it('should correctly use the buildIChefURL function to create the image url', () => {
      render(<Byline blocks={bylineWithPngPhoto} />, { pageType });

      const imageSrc = screen.getByRole('presentation');

      expect(imageSrc).toHaveAttribute(
        'src',
        'https://ichef.bbci.co.uk/ace/ws/160/cpsprodpb/f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png.webp',
      );
    });

    it('should render one image in the byline', () => {
      render(<Byline blocks={bylineWithPngPhoto} />, { pageType });

      const image = screen.getAllByRole('presentation');

      expect(image.length).toBe(1);
    });

    it('should not render an image if a png photo is not used', () => {
      render(<Byline blocks={bylineWithNonPngPhoto} />, { pageType });

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
        { pageType },
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
        { pageType },
      );

      const listItems = screen.getAllByRole('listitem');

      expect(listItems.length).toBe(4);
    });

    it('should render the Byline correctly with location, image and links', () => {
      render(<Byline blocks={bylineWithPngPhoto} />, { pageType });

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
        { pageType },
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
          pageType,
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
      render(<Byline blocks={[bylineData]} />, { pageType: LIVE_PAGE });

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
          pageType: LIVE_PAGE,
        },
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should render a section with role region', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: LIVE_PAGE });

      const region = screen.getByRole('region');

      expect(region).toBeInTheDocument();
    });

    it('should render a list when required data is passed correctly', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: LIVE_PAGE });

      const [list] = screen.getAllByRole('list');

      expect(list).toBeInTheDocument();
    });

    it('should render all listitems correctly', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: LIVE_PAGE });

      const [firstContributor] = screen.getAllByRole('list');
      const firstContributorItems =
        within(firstContributor).getAllByRole('listitem');

      expect(firstContributorItems.length).toBe(4);
    });

    it('should correctly use the buildIChefURL function to create the image url', () => {
      render(<Byline blocks={[bylineData]} />, { pageType: LIVE_PAGE });

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
        pageType: LIVE_PAGE,
      });

      const image = screen.queryByRole('presentation');

      expect(image).toBeNull();
    });

    it.each`
      expectation | info        | text
      ${'Author'} | ${'Author'} | ${'Author,'}
      ${'Role'}   | ${'Role'}   | ${'Role,'}
    `('should correctly announce $expectation for $info', ({ text }) => {
      render(<Byline blocks={[bylineData]} />, { pageType: LIVE_PAGE });

      const findText = screen.getByText(text);

      expect(findText).toBeInTheDocument();
    });

    it.each`
      info        | translation
      ${'author'} | ${'Barreessaa,'}
      ${'role'}   | ${'Gahee,'}
    `('should translate $info announcement correctly', ({ translation }) => {
      render(<Byline blocks={[bylineData]} />, {
        pageType: LIVE_PAGE,
        service: 'afaanoromoo',
      });

      const findTranslation = screen.getByText(translation);

      expect(findTranslation).toBeInTheDocument();
    });
  });
});
