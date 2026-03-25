import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import homePageFixture from '#data/ws/homePage/index.json';
import { Services } from '#app/models/types/global';
import HighImpactPromo, { HighImpactPromoProps } from '.';

const { summaries } = homePageFixture.data.curations[0];
const promoFixtureData = summaries?.[0] as HighImpactPromoProps;

interface FixtureProps {
  promoData?: HighImpactPromoProps;
  headingLevel?: number;
  relatedTopic?: { title: string; link: { url: string } } | null | undefined;
}

const Fixture = ({
  promoData = promoFixtureData,
  headingLevel,
  relatedTopic,
}: FixtureProps) => (
  <HighImpactPromo
    {...promoData}
    headingLevel={headingLevel}
    {...(relatedTopic !== undefined && { relatedTopic })}
  />
);

describe('High Impact Promo', () => {
  it('should render the promo with correct title', () => {
    render(<Fixture />);

    const heading = screen.getByRole('heading', {
      level: 3,
      name: promoFixtureData.title,
    });
    const link = screen.getByRole('link', { name: promoFixtureData.title });
    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', promoFixtureData.link);
  });

  it('should allow the heading level to be overridden', () => {
    render(<Fixture headingLevel={2} />, {
      service: 'pidgin',
      pageType: 'home',
    });

    const heading = screen.getByRole('heading', {
      level: 2,
      name: promoFixtureData.title,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render the promo image with correct alt text', () => {
    render(<Fixture />, { service: 'pidgin', pageType: 'home' });
    const image = screen.getByAltText(promoFixtureData.imageAlt as string);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      promoFixtureData.imageUrl.replace('{width}', '240'),
    );
  });

  it('should render default subject values when relatedTopic prop is not provided', () => {
    render(<Fixture />, { service: 'mundo' });

    const subjectLink = screen.getByRole('link', {
      name: 'BBC News Mundo',
    });
    expect(subjectLink).toBeInTheDocument();
    expect(subjectLink).toHaveAttribute('href', '/mundo');
    expect(subjectLink).toHaveStyle({
      'margin-top': 'auto',
    });
  });

  it.each<[Services, string]>([
    ['mundo', 'ltr'],
    ['arabic', 'rtl'],
  ])('should render %s service with dir="%s"', (service, dir) => {
    render(<Fixture />, { service });
    const promo = screen.getByTestId('high-impact-promo');
    expect(promo).toHaveAttribute('dir', dir);
  });

  it('should render relatedTopic when provided', () => {
    const relatedTopic = {
      title: 'Россия',
      link: { url: 'https://www.bbc.com/russian/topics/cw6eyw7m0m1t' },
    };
    render(<Fixture relatedTopic={relatedTopic} />);

    const relatedTopicLink = screen.getByRole('link', {
      name: 'Россия',
    });
    expect(relatedTopicLink).toBeInTheDocument();
    expect(relatedTopicLink).toHaveAttribute(
      'href',
      'https://www.bbc.com/russian/topics/cw6eyw7m0m1t',
    );
  });
});
