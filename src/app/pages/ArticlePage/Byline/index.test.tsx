/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Byline from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ArticleTimestamp from '../../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNoRole,
  bylineWithNoAuthor,
  bylineWithNameAndRole,
} from './fixture';

interface Props {
  fixture: any;
  service: string;
  children?: JSX.Element;
}

const FixtureByline = ({ fixture, service, children }: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <Byline blocks={fixture}>{children}</Byline>
    </ServiceContextProvider>
  );
};

describe('Byline', () => {
  it('Should render Byline correctly when only required data is passed', () => {
    render(<FixtureByline fixture={bylineWithNameAndRole} service="news" />);

    const author = screen.getByText('Single Byline (all values)');
    const role = screen.getByText('Test');

    expect(author).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });

  it('Should return null when there is no role in the data', () => {
    const { container } = render(
      <FixtureByline fixture={bylineWithNoRole} service="news" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('Should return null when there is no author in the data', () => {
    const { container } = render(
      <FixtureByline fixture={bylineWithNoAuthor} service="news" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render a section with role region', () => {
    render(<FixtureByline fixture={bylineWithNameAndRole} service="news" />);

    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });
  it('should render a list when required data is passed correctly', () => {
    render(<FixtureByline fixture={bylineWithNameAndRole} service="news" />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render all listitems correctyle', () => {
    render(<FixtureByline fixture={bylineWithNameAndRole} service="news" />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(2);
  });

  it('should correctly render Timestamp when passeed as a children', () => {
    render(
      <FixtureByline fixture={bylineWithNameAndRole} service="news">
        <ArticleTimestamp
          firstPublished={1660658887}
          lastPublished={1660658887}
          popOut={false}
        />
      </FixtureByline>,
    );

    const timestamp = screen.getByText('20 January 1970');
    expect(timestamp).toBeInTheDocument();
  });

  it('should correctly render an extra listitem for Timestamp', () => {
    render(
      <FixtureByline fixture={bylineWithNameAndRole} service="news">
        <ArticleTimestamp
          firstPublished={1660658887}
          lastPublished={1660658887}
          popOut={false}
        />
      </FixtureByline>,
    );
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(3);
  });

  it.each`
    expectation    | info           | text
    ${'Author'}    | ${'Author'}    | ${'Author,'}
    ${'Role'}      | ${'Role'}      | ${'Role,'}
    ${'Published'} | ${'Published'} | ${'Published,'}
  `('should correctly announce $expectation for $info', ({ text }) => {
    render(
      <FixtureByline fixture={bylineWithNameAndRole} service="news">
        <ArticleTimestamp
          firstPublished={1660658887}
          lastPublished={1660658887}
          popOut={false}
        />
      </FixtureByline>,
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
      <FixtureByline fixture={bylineWithNameAndRole} service="afaanoromoo">
        <ArticleTimestamp
          firstPublished={1660658887}
          lastPublished={1660658887}
          popOut={false}
        />
      </FixtureByline>,
    );
    const findTranslation = screen.getByText(translation);
    expect(findTranslation).toBeInTheDocument();
  });
});
