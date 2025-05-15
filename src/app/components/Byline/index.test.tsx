/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
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

describe('Byline', () => {
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

  it('should render Byline correctly when passed Twitter and TopicUrl links', () => {
    render(<Byline blocks={bylineWithLink} />);

    const AuthorLink = screen.getByText('Single Byline (all values)');
    const TwitterLink = screen.getByText('@test');
    const Links = screen.getAllByRole('link');

    expect(AuthorLink).toBeInTheDocument();
    expect(TwitterLink).toBeInTheDocument();
    expect(Links.length).toBe(2);
    expect(Links[0]).toHaveAttribute('href', '/news/topics/c8qx38nq177t');
    expect(Links[1]).toHaveAttribute('href', 'https://twitter.com/test');
  });

  it('should render a section with role region', () => {
    render(<Byline blocks={bylineWithNameAndRole} />);

    const region = screen.getByRole('region');

    expect(region).toBeInTheDocument();
  });

  it('should render a list when required data is passed correctly', () => {
    render(<Byline blocks={bylineWithNameAndRole} />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });

  it('should render all listitems correctly', () => {
    render(<Byline blocks={bylineWithPngPhoto} />);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(5);
  });

  it('should correctly use the buildIChefURL function to create the image url', () => {
    render(<Byline blocks={bylineWithPngPhoto} />);

    const imageSrc = screen.getAllByRole('presentation');

    expect(imageSrc[0]).toHaveAttribute(
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

    const image = screen.queryByRole('img');

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

    expect(listItems.length).toBe(3);
  });

  it('should render the Byline correctly with location, image and links', () => {
    render(<Byline blocks={bylineWithPngPhoto} />);

    const AuthorLink = screen.getByText('Mayeni Jones');
    const TwitterLink = screen.getByText('@MayeniJones');
    const Links = screen.getAllByRole('link');
    const Location = screen.getByText('Lagos, Nigeria');
    const Image = screen.getByRole('presentation');

    expect(AuthorLink).toBeInTheDocument();
    expect(TwitterLink).toBeInTheDocument();
    expect(Links.length).toBe(1);
    expect(Location).toBeInTheDocument();
    expect(Image).toBeInTheDocument();
  });

  it.each`
    expectation         | info                | text
    ${'Author'}         | ${'Author'}         | ${'Author,'}
    ${'Role'}           | ${'Role'}           | ${'Role,'}
    ${'Twitter'}        | ${'Twitter'}        | ${'Twitter,'}
    ${'Reporting from'} | ${'Reporting from'} | ${'Reporting from'}
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
    ${'reportingFrom'} | ${'Gabaasni irraati'}
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
