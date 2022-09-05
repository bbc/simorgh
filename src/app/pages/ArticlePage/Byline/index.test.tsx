/* eslint-disable no-template-curly-in-string */
import React from 'react';
import {
  render,
  screen,
} from '../../../components/react-testing-library-with-providers';
import Byline from '.';
import ArticleTimestamp from '../../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNoRole,
  bylineWithNoAuthor,
  bylineWithNameAndRole,
  bylineWithLink,
} from './fixture';

describe('Byline', () => {
  it('Should render Byline correctly when only required data is passed', () => {
    render(<Byline blocks={bylineWithNameAndRole} />);

    const author = screen.getByText('Single Byline (all values)');
    const role = screen.getByText('Test');

    expect(author).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });

  it('Should return null when there is no role in the data', () => {
    const { container } = render(<Byline blocks={bylineWithNoRole} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('Should return null when there is no author in the data', () => {
    const { container } = render(<Byline blocks={bylineWithNoAuthor} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render Byline correctly when passed a Twitter Link', () => {
    render(<Byline blocks={bylineWithLink} />);

    const AuthorLink = screen.getByText('Single Byline (all values)');
    const TwitterLink = screen.getByText('@test');
    const Links = screen.getAllByRole('link');

    expect(AuthorLink).toBeInTheDocument();
    expect(TwitterLink).toBeInTheDocument();
    expect(Links.length).toBe(2);
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
    render(<Byline blocks={bylineWithNameAndRole} />);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(2);
  });

  it('should correctly render Timestamp when passeed as a child', () => {
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

  it.each`
    expectation    | info           | text
    ${'Author'}    | ${'Author'}    | ${'Author,'}
    ${'Role'}      | ${'Role'}      | ${'Role,'}
    ${'Twitter'}   | ${'Twitter'}   | ${'Twitter,'}
    ${'Published'} | ${'Published'} | ${'Published,'}
  `('should correctly announce $expectation for $info', ({ text }) => {
    render(
      <Byline blocks={bylineWithLink}>
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
    info           | translation
    ${'author'}    | ${'Barreessaa,'}
    ${'role'}      | ${'Gahee,'}
    ${'published'} | ${'Maxxanfame,'}
  `('should translate $info announcement correctly', ({ translation }) => {
    render(
      <Byline blocks={bylineWithLink}>
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
