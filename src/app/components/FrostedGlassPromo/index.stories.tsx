import { RequestContextProvider } from '#contexts/RequestContext';
import AmpDecorator from '#storybook/helpers/ampDecorator';
import Promo from '.';
import {
  cpsPromoFixture,
  linkPromoFixture,
  cpsNewsPromoFixture,
} from './fixtures';

interface Props {
  imageUrl: string;
  mainBody: string;
  minimumContrast: number;
  paletteSize: number;
}

const Component = (props: Props) => {
  const { imageUrl, mainBody, minimumContrast, paletteSize } = props;
  return (
    <Promo
      // @ts-expect-error - passing in partial data
      image={{ src: imageUrl, alt: '', width: 500, height: 250, ratio: 52 }}
      url="#"
      minimumContrast={minimumContrast}
      paletteSize={paletteSize}
    >
      {mainBody}
    </Promo>
  );
};

const WithCPSPromoData = () => <Promo {...cpsPromoFixture} />;

const WithNewsCPSPromoData = () => <Promo {...cpsNewsPromoFixture} />;

const WithLinkPromoData = () => <Promo {...linkPromoFixture} />;

export default {
  title: 'Components/Frosted Glass Promo',
  Component,
  args: {
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/976/cpsprodpb/189F/production/_121530360_hi071904982.jpg',
    mainBody:
      'Man City vs West Ham: Bad weather force Premier League to cancel Sunday match',
    minimumContrast: 8,
    paletteSize: 20,
  },
  argTypes: {
    imageUrl: { control: 'text' },
    mainBody: { control: 'text' },
    minimumContrast: { control: 'number' },
    paletteSize: { control: 'range', min: 2, max: 99, step: 1 },
  },
};

export const Standalone = Component;
export const CPSPromo = WithCPSPromoData;
export const CPSNewsPromo = WithNewsCPSPromoData;
export const LinkPromo = WithLinkPromoData;

export const HomepageFallback = () => (
  <RequestContextProvider service="mundo" pageType="home" pathname="/mundo">
    <div style={{ maxWidth: 400 }}>
      <Promo {...cpsPromoFixture} />
    </div>
  </RequestContextProvider>
);

export const AMP = () => (
  <RequestContextProvider
    service="mundo"
    pageType="STY"
    pathname="/mundo/internacional-23038380.amp"
    isAmp
  >
    <div style={{ maxWidth: 400 }}>
      <Promo {...cpsPromoFixture} />
    </div>
  </RequestContextProvider>
);

AMP.decorators = [AmpDecorator];

export const Lite = () => (
  <RequestContextProvider
    service="mundo"
    pageType="STY"
    pathname="/mundo/internacional-23038380.lite"
    isLite
  >
    <div style={{ maxWidth: 400 }}>
      <Promo {...cpsPromoFixture} />
    </div>
  </RequestContextProvider>
);
