import React, { useContext } from 'react';
import { string, number, elementType } from 'prop-types';
import { Helmet } from 'react-helmet';

import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
} from '@bbc/psammead-assets/amp-boilerplate';

import { ServiceContext } from '#contexts/ServiceContext';
import MostReadList from '../Canonical/List';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';

// eslint-disable-next-line react/prop-types
const MostReadAmp = ({ endpoint, size, wrapper: Wrapper, columnLayout }) => {
  const {
    service,
    script,
    dir,
    mostRead: { numberOfItems },
  } = useContext(ServiceContext);

  console.log('MOSTREAD >>> ', numberOfItems);

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
          <template type="amp-mustache">
            <MostReadList
              numberOfItems={numberOfItems}
              dir={dir}
              columnLayout="oneColumn"
            >
              {items.map((item, i) => (
                <MostReadItemWrapper
                  dir={dir}
                  key={item.id}
                  columnLayout={columnLayout}
                >
                  <MostReadRank
                    service={service}
                    script={script}
                    listIndex={i + 1}
                    numberOfItems={items.length}
                    dir={dir}
                    columnLayout={columnLayout}
                    size={size}
                  />
                  <MostReadLink
                    dir={dir}
                    service={service}
                    script={script}
                    title={item.title}
                    href={item.href}
                    size={size}
                  />
                </MostReadItemWrapper>
              ))}
              <MostReadItemWrapper dir={dir} columnLayout="oneColumn">
                <MostReadRank
                  service={service}
                  script={script}
                  numberOfItems={numberOfItems}
                  dir={dir}
                  listIndex="{{ rank }}"
                  columnLayout="oneColumn"
                  size={size}
                />
                <MostReadLink
                  dir={dir}
                  service={service}
                  script={script}
                  title="{{promo.headlines.shortHeadline}}"
                  href="{{promo.locators.assetUri}}"
                  size={size}
                />
              </MostReadItemWrapper>
            </MostReadList>
          </template>
        </amp-list>
      </Wrapper>
    </>
  );
};

MostReadAmp.propTypes = {
  endpoint: string.isRequired,
  size: number.isRequired,
  wrapper: elementType,
};

MostReadAmp.defaultProps = {
  wrapper: React.Fragment,
};

export default MostReadAmp;
