import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { string, elementType, number } from 'prop-types';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { ServiceContext } from '#contexts/ServiceContext';
import MostReadList from '../Canonical/List';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';

const AmpMostRead = ({ endpoint, size, wrapper: Wrapper }) => {
  const {
    service,
    script,
    dir,
    mostRead: { numberOfItems },
  } = useContext(ServiceContext);

  console.log({ endpoint });

  return (
    <Wrapper>
      {/* Import required amp scripts for most read */}
      <p>This is an amp Most Read</p>
      <Helmet>
        {AMP_LIST_JS}
        {AMP_MUSTACHE_JS}
      </Helmet>

      <MostReadList
        numberOfItems={numberOfItems}
        dir={dir}
        columnLayout="ampOneColumn"
      >
        <amp-list
          width="300"
          height="100"
          layout="responsive"
          src={endpoint}
          items="records"
          max-items={numberOfItems}
        >
          <template type="amp-mustache">
            <MostReadItemWrapper dir={dir} columnLayout="ampOneColumn">
              <MostReadRank
                service={service}
                script={script}
                numberOfItems={numberOfItems}
                dir={dir}
                listIndex={'{{ rank }}'}
                columnLayout="oneColumn"
                size={size}
                isAmp
              />
              <MostReadLink
                dir={dir}
                service={service}
                script={script}
                title={'{{promo.headlines.shortHeadline}}'}
                href={'{{promo.locators.assetUri}}'}
                size={size}
              />
            </MostReadItemWrapper>
          </template>
        </amp-list>
      </MostReadList>
    </Wrapper>
  );
};

AmpMostRead.propTypes = {
  endpoint: string,
  size: number,
  wrapper: elementType,
};

AmpMostRead.defaultProps = {
  endpoint: '',
  size: 100,
  wrapper: React.Fragment,
};
export default AmpMostRead;
