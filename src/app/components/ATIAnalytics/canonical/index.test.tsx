import { Helmet } from 'react-helmet';
import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import processClientDeviceAndSendStaticBeacon from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';
import CanonicalATIAnalytics from '.';
import { ReverbBeaconConfig } from '../types';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const reverbBaseUrl = 'https://a1.api.bbc.co.uk/hit.xiti';
  const mockReverbParams = {
    params: {
      env: 'live',
      page: {
        contentId: 'urn:bbc:optimo:asset:cvgr9dk5dlno',
        contentType: 'article',
        destination: 'NEWS_LANGUAGES_GNL_TEST',
        name: 'japanese.articles.cvgr9dk5dlno.page',
        producer: 'JAPANESE',
        additionalProperties: {
          app_name: 'news-japanese',
          app_type: 'responsive',
          content_language: 'ja',
          product_platform: null,
          referrer_url: null,
          x5: 'http%3A%2F%2Flocalhost%3A7081%2Fjapanese%2Farticles%2Fcvgr9dk5dlno%3Frenderer_env%3Dlive',
          x8: 'simorgh',
          x9: 'ゼレンスキー氏、領土問題が和平交渉で「最も困難」%20%20米特使はプーチン氏と会談へ',
          x10: null,
          x11: '2025-12-02T01:53:57.743Z',
          x12: '2025-12-02T01:53:57.743Z',
          x13: 'Europe~Volodymyr+Zelensky~Russia–Ukraine+war~Emmanuel+Macron~Russia~Eastern+Europe~France~Diplomacy~Donald+Trump~Vladimir+Putin~United+States~Military~Ukraine',
          x14: '0b0bfd5a-81b8-43fa-91fc-57f1fcd24487~1808a59a-896b-4112-89c1-b713b991a1d1~23d96e97-b777-413a-a8c5-85a2eda98613~279feee6-7189-4e96-ad17-627f71685373~39267b85-1784-4f4b-80ed-f8cb4a35f337~57ade6dd-a03a-4e8e-ade3-53899690623b~61ef4416-de68-49ff-9c97-e0779dafd9d2~6fcca1fa-293b-4449-ac67-120f545c6a0d~78080d81-2849-497e-bc3a-bf364626456b~7fd6ee44-38a3-4fe3-a40f-7b4f8f72c67f~82857f8e-8134-462a-bb32-b7b14f4eab75~ce5c43ee-8982-4f88-9472-9aa79aeb09cc~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c',
          x16: '',
          x17: 'Europe~Volodymyr+Zelensky~Russia–Ukraine+war~Emmanuel+Macron~Russia~Eastern+Europe~France~Diplomacy~Donald+Trump~Vladimir+Putin~United+States~Military~Ukraine',
          x18: false,
        },
      },
      user: {
        isSignedIn: false,
      },
    },
    eventDetails: {
      eventName: 'pageView',
    },
  } as ReverbBeaconConfig;

  const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');
  // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
  beacon.default = mockSendBeacon;

  it('should add scripts to helmet', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    act(() => {
      render(<CanonicalATIAnalytics reverbParams={mockReverbParams} />);
    });

    const helmet = Helmet.peek();

    expect(helmet.scriptTags).toHaveLength(2);
  });

  it('should render sendStaticBeacon Helmet script', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    act(() => {
      render(<CanonicalATIAnalytics reverbParams={mockReverbParams} />);
    });

    const helmet = Helmet.peek();

    expect(helmet.scriptTags[0].innerHTML).toEqual(
      addSendStaticBeaconToWindow(),
    );
  });

  it('should contain a beacon onLoad script via processClientDeviceAndSendStaticBeacon on lite', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    act(() => {
      render(<CanonicalATIAnalytics reverbParams={mockReverbParams} />, {
        isLite: true,
      });
    });

    const helmet = Helmet.peek();
    const sendPageViewBeaconLite = helmet.scriptTags[1].innerHTML;

    expect(sendPageViewBeaconLite).toContain(
      processClientDeviceAndSendStaticBeacon.toString(),
    );
    expect(sendPageViewBeaconLite).toContain(reverbBaseUrl);
  });

  it('should not send beacon when browser is Opera Mini', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => true);

    act(() => {
      render(<CanonicalATIAnalytics reverbParams={mockReverbParams} />);
    });

    expect(mockSendBeacon).not.toHaveBeenCalled();
  });

  it('should render a noscript image for non-JS users', () => {
    const { container } = render(
      <CanonicalATIAnalytics reverbParams={mockReverbParams} />,
    );
    expect(container.querySelector('noscript')).toBeInTheDocument();
  });
});
