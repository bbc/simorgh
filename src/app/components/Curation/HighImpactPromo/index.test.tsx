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
  attributions?: { title: string; link: { url: string } }[] | null | undefined;
  relatedTopic?: { title: string; link: { url: string } } | null | undefined;
}

const Fixture = ({
  promoData = promoFixtureData,
  headingLevel,
  attributions,
  relatedTopic,
}: FixtureProps) => (
  <HighImpactPromo
    {...promoData}
    headingLevel={headingLevel}
    {...(attributions !== undefined && { attributions })}
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

  it('should render correct attribution when an attributions prop is provided', () => {
    const customAttributions = [
      {
        title: 'Pidgin Related Topic',
        link: { url: '/pidgin/topics/234567' },
      },
    ];
    render(<Fixture attributions={customAttributions} />);

    const attributionLink = screen.getByRole('link', {
      name: 'Pidgin Related Topic',
    });
    expect(attributionLink).toBeInTheDocument();
    expect(attributionLink).toHaveAttribute('href', '/pidgin/topics/234567');
  });
  it('should render default attribution when attributions prop is null', () => {
    render(<Fixture attributions={null} />, { service: 'mundo' });
    const attributionLink = screen.getByRole('link', {
      name: 'BBC News Mundo',
    });
    expect(attributionLink).toBeInTheDocument();
    expect(attributionLink).toHaveAttribute('href', '/mundo');
  });

  it('should render default attribution when attributions prop is an empty array', () => {
    render(<Fixture attributions={[]} />, { service: 'mundo' });
    const attributionLink = screen.getByRole('link', {
      name: 'BBC News Mundo',
    });
    expect(attributionLink).toBeInTheDocument();
    expect(attributionLink).toHaveAttribute('href', '/mundo');
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
    render(<Fixture relatedTopic={relatedTopic} attributions={null} />);

    const relatedTopicLink = screen.getByRole('link', {
      name: 'Россия',
    });
    expect(relatedTopicLink).toBeInTheDocument();
    expect(relatedTopicLink).toHaveAttribute(
      'href',
      'https://www.bbc.com/russian/topics/cw6eyw7m0m1t',
    );
  });

  it('should prioritize relatedTopic over attributions when both are provided', () => {
    const relatedTopic = {
      title: 'Related Topic Title',
      link: { url: '/related/path' },
    };
    const attributions = [
      {
        title: 'Attribution Title',
        link: { url: '/attribution/path' },
      },
    ];
    render(<Fixture relatedTopic={relatedTopic} attributions={attributions} />);

    const relatedTopicLink = screen.getByRole('link', {
      name: 'Related Topic Title',
    });
    expect(relatedTopicLink).toBeInTheDocument();
    expect(relatedTopicLink).toHaveAttribute('href', '/related/path');
  });
});
