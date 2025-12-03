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
  attribution?: {
    link: string;
    text: string;
  };
}

const Fixture = ({
  promoData = promoFixtureData,
  headingLevel,
  attribution,
}: FixtureProps) => (
  <HighImpactPromo
    {...promoData}
    headingLevel={headingLevel}
    attribution={attribution}
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

  it('should render default values if attribution prop is not provided', () => {
    render(<Fixture />, { service: 'mundo' });

    const attributionLink = screen.getByRole('link', {
      name: 'BBC News Mundo',
    });
    expect(attributionLink).toBeInTheDocument();
    expect(attributionLink).toHaveAttribute('href', '/mundo');

    const divider = attributionLink.previousElementSibling;
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveStyle({
      'background-color': '#EB0000',
      width: '2.5rem',
      height: '0.1875rem',
    });
  });

  it('should render correct attribution when an attribution prop is provided', () => {
    const customAttribution = {
      link: '/pidgin',
      text: 'BBC News Pidgin',
    };
    render(<Fixture attribution={customAttribution} />, { service: 'mundo' });

    const attributionLink = screen.getByRole('link', {
      name: 'BBC News Pidgin',
    });
    expect(attributionLink).toBeInTheDocument();
    expect(attributionLink).toHaveAttribute('href', '/pidgin');
  });

  it.each<[Services, string]>([
    ['mundo', 'ltr'],
    ['arabic', 'rtl'],
  ])('should render %s service with dir="%s"', (service, dir) => {
    render(<Fixture />, { service });
    const promo = screen.getByTestId('high-impact-promo');
    expect(promo).toHaveAttribute('dir', dir);
  });
});
