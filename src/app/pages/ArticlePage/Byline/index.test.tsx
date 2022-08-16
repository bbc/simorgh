import { render, screen } from '@testing-library/react';
import Byline from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
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

    expect(author).toBeTruthy();
    expect(role).toBeTruthy();
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
    const { container } = render(
      <FixtureByline fixture={bylineWithNoAuthor} service="news" />,
    );
  });
  it('should render a list', () => {});
  it('should render timestamp if passed as a children', () => {});
  it('should correctly traslate author announcement', () => {});
  it('should correctly translate role announcement', () => {});
});
