import { log } from 'console';
import {
  render,
  screen,
  within,
} from '../../react-testing-library-with-providers';
import Contributors from '.';
import bylineExtractor from '../utilities/bylineExtractor';
import {
  bylineWithNameAndRole,
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithPngPhoto,
} from '../../../pages/ArticlePage/fixtureData';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';

describe('Article Contributors', () => {
  it('Should render contributors correctly when only required data is passed', () => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithNameAndRole,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
    );

    const author = screen.getByText('Single Byline (all values)');
    const role = screen.getByText('Test');

    expect(author).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });

  it('should render Byline correctly when passed TopicUrl links', () => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithLink,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
    );

    const AuthorLink = screen.getByText('Single Byline (all values)');
    const Links = screen.getAllByRole('link');

    expect(AuthorLink).toBeInTheDocument();
    expect(Links.length).toBe(1);
    expect(Links[0]).toHaveAttribute('href', '/news/topics/c8qx38nq177t');
  });

  it('should render a list when required data is passed correctly', () => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithNameAndRole,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
    );

    const [list] = screen.getAllByRole('list');

    expect(list).toBeInTheDocument();
  });

  it('should render all listitems correctly', () => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithPngPhoto,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
    );

    const contributor = screen.getByRole('list');
    const contributorItems = within(contributor).getAllByRole('listitem');

    expect(contributorItems.length).toBe(4);
  });

  it('should correctly use the buildIChefURL function to create the image url', () => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithPngPhoto,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
    );

    const imageSrc = screen.getByRole('presentation');

    expect(imageSrc).toHaveAttribute(
      'src',
      'https://ichef.bbci.co.uk/ace/ws/160/cpsprodpb/f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png.webp',
    );
  });

  it('should render one image for the contributor', () => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithPngPhoto,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
    );

    const image = screen.getAllByRole('presentation');

    expect(image.length).toBe(1);
  });

  it('should render the Byline correctly with name, location and image', () => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithPngPhoto,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
    );

    const AuthorName = screen.getByText('Mayeni Jones');
    const Location = screen.getByText('Lagos, Nigeria');
    const Image = screen.getByRole('presentation');

    expect(AuthorName).toBeInTheDocument();
    expect(Location).toBeInTheDocument();
    expect(Image).toBeInTheDocument();
  });

  it.each`
    expectation         | info                | text
    ${'Author'}         | ${'Author'}         | ${'Author,'}
    ${'Role'}           | ${'Role'}           | ${'Role,'}
    ${'Reporting from'} | ${'Reporting from'} | ${'Reporting from,'}
  `('should correctly announce $expectation for $info', ({ text }) => {
    const contributorValues = bylineExtractor({
      blocks: bylineWithLinkAndLocation,
      pageType: ARTICLE_PAGE,
    });

    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
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
    const contributorValues = bylineExtractor({
      blocks: bylineWithLinkAndLocation,
      pageType: ARTICLE_PAGE,
    });
    render(
      <Contributors
        contributorValues={contributorValues}
        isSingleContributor
      />,
      {
        service: 'afaanoromoo',
      },
    );

    const findTranslation = screen.getByText(translation);

    expect(findTranslation).toBeInTheDocument();
  });
});
