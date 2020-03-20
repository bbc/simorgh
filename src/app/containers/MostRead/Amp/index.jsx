import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
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

const AmpMostRead = ({ endpoint, maxTwoColumns }) => {
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
      <amp-list
        width="300"
        height="200"
        layout="responsive"
        src={endpoint}
        items="records"
        max-items="10"
        style={{ backgroundColor: 'red' }}
      >
        <MostReadList
          numberOfItems={numberOfItems}
          dir={dir}
          maxTwoColumns={maxTwoColumns}
        >
          <template type="amp-mustache">
            <MostReadItemWrapper dir={dir} maxTwoColumns={maxTwoColumns}>
              <MostReadRank
                service={service}
                script={script}
                numberOfItems={numberOfItems}
                dir={dir}
                listIndex={'{{ rank }}'}
                maxTwoColumns={maxTwoColumns}
              />
              <MostReadLink
                dir={dir}
                service={service}
                script={script}
                title={'{{promo.headlines.shortHeadline}}'}
                href={'{{promo.locators.assetUri}}'}
              ></MostReadLink>
            </MostReadItemWrapper>
          </template>
        </MostReadList>
      </amp-list>
    </>
  );
};

export default AmpMostRead;
