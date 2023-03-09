import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { FEATURE_INDEX_PAGE } from '#app/routes/utils/pageTypes';
import {
  render,
  act,
} from '../../../components/react-testing-library-with-providers';
import MPU from './MPU';

const toggles = {
  ads: {
    enabled: true,
  },
};

describe('MPU', () => {
  it('should render without gel margins at all breakpoints and gel padding at smaller breakpoints', async () => {
    const service = 'pidgin';

    let container;
    await act(async () => {
      ({ container } = render(
        <StaticRouter>
          <ToggleContextProvider toggles={toggles}>
            <RequestContextProvider
              isAmp={false}
              pageType={FEATURE_INDEX_PAGE}
              service={service}
              pathname="12345678"
              showAdsBasedOnLocation
            >
              <MPU />
            </RequestContextProvider>
          </ToggleContextProvider>
        </StaticRouter>,
      ));
    });

    expect(container).toMatchSnapshot();
  });
});
