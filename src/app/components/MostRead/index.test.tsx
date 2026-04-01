import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { data as pidginMostReadData } from '../../../../data/pidgin/mostRead/index.json';
import serbianLatMostReadData from '../../../../data/serbian/mostRead/lat.json';
import { HOME_PAGE } from '../../routes/utils/pageTypes';
import { render, act } from '../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MostRead from '.';
import { PageTypes, Services, Variants } from '../../models/types/global';
import Canonical from './Canonical';
import { MostReadData } from './types';

jest.mock('./Canonical');
jest.mock('../../lib/utilities/isLocal', () =>
  jest.fn().mockImplementation(() => true),
);

interface MostReadProps {
  isAmp: boolean;
  service: Services;
  variant: Variants | null;
  mostReadToggle: boolean;
  pageType?: PageTypes;
  data?: MostReadData;
}

const MostReadWithContext = ({
  isAmp = false,
  service,
  variant = null,
  mostReadToggle,
  pageType = HOME_PAGE,
  data,
}: MostReadProps) => (
  <ToggleContextProvider
    toggles={{
      mostRead: {
        enabled: mostReadToggle,
      },
    }}
  >
    <RequestContextProvider
      bbcOrigin={`http://localhost:7080/${service}`}
      isAmp={isAmp}
      pageType={pageType}
      service={service}
      statusCode={200}
      pathname={`/${service}`}
      variant={variant}
      isApp={false}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <MostRead data={data} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

const shouldRenderMostRead = () => expect(Canonical).toHaveBeenCalled();

const shouldNotRenderMostRead = () => expect(Canonical).not.toHaveBeenCalled();

describe('MostRead', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Canonical', () => {
    [
      {
        description: 'should render most read for pidgin with toggles on',
        service: 'pidgin',
        mostReadToggle: true,
        isAmp: false,
        variant: null,
        renderExpectation: shouldRenderMostRead,
        dataResponse: pidginMostReadData,
      },
      {
        description: 'should render most read for serbian lat with toggles on',
        service: 'serbian',
        mostReadToggle: true,
        isAmp: false,
        variant: 'lat',
        renderExpectation: shouldRenderMostRead,
        dataResponse: serbianLatMostReadData,
      },
      {
        description: 'should not render most read for pidgin with toggles off',
        service: 'pidgin',
        mostReadToggle: false,
        isAmp: false,
        variant: null,
        renderExpectation: shouldNotRenderMostRead,
        dataResponse: pidginMostReadData,
      },
      {
        description: 'should not render most read when data is null',
        service: 'pidgin',
        mostReadToggle: true,
        isAmp: false,
        variant: null,
        renderExpectation: shouldNotRenderMostRead,
        dataResponse: null,
      },
    ].forEach(
      ({
        description,
        service,
        mostReadToggle,
        isAmp,
        variant,
        renderExpectation,
        dataResponse,
      }) => {
        it(description, async () => {
          await act(async () => {
            render(
              <MostReadWithContext
                service={service as Services}
                mostReadToggle={mostReadToggle}
                isAmp={isAmp}
                variant={variant as Variants}
                // @ts-expect-error some responses are null
                data={dataResponse}
              />,
            );
          });

          renderExpectation();
        });
      },
    );
  });
});
