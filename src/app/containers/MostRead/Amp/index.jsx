import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';

import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import {
  MostReadList,
  MostReadItemWrapper,
  MostReadRank,
  MostReadLink,
} from '@bbc/psammead-most-read';
import { ServiceContext } from '#contexts/ServiceContext';

const AmpMostRead = ({ endpoint, wrapper: Wrapper }) => {
  const {
    service,
    script,
    dir,
    mostRead: { numberOfItems },
  } = useContext(ServiceContext);

  return (
    <>
      {/* Import required amp scripts for most read */}
      <Helmet>
        {AMP_LIST_JS}
        {AMP_MUSTACHE_JS}
      </Helmet>
      <Wrapper>
        <amp-list
          width="300"
          height="100"
          layout="responsive"
          src={endpoint}
          items="records"
          max-items={numberOfItems}
        >
          <MostReadList
            numberOfItems={numberOfItems}
            dir={dir}
            columnLayout="oneColumn"
          >
            <template type="amp-mustache">
              <MostReadItemWrapper dir={dir} columnLayout="oneColumn">
                <MostReadRank
                  service={service}
                  script={script}
                  numberOfItems={numberOfItems}
                  dir={dir}
                  listIndex={'{{ rank }}'}
                  columnLayout="oneColumn"
                />
                <MostReadLink
                  dir={dir}
                  service={service}
                  script={script}
                  title={'{{promo.headlines.shortHeadline}}'}
                  href={'{{promo.locators.assetUri}}'}
                />
              </MostReadItemWrapper>
            </template>
          </MostReadList>
        </amp-list>
      </Wrapper>
    </>
  );
};
export default AmpMostRead;
