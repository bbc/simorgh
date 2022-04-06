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

  const innerHTML = `
    "cupcakes": {
      "imageUrl": "https://amp.dev/static/samples/img/image2.jpg",
      "text": "test has worked",
      "style": "greenBorder"
    },
    "sushi": {
      "imageUrl": "https://amp.dev/static/samples/img/image3.jpg",
      "style": "redBorder"
    }`;

  return (
    <Wrapper>
      {/* Import required amp scripts for most read */}
      <Helmet>
        {AMP_LIST_JS}
        {AMP_MUSTACHE_JS}
      </Helmet>

      {/* <Helmet>
        <amp-state id="numerals">
          script=
          {[
            {
              type: 'text/javascript',
              innerHTML,
            },
          ]}
        </amp-state>
      </Helmet> */}

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
            <amp-state id="theFood">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<script type="application/json">
                      {
                        "cupcakes": {
                          "imageUrl": "https://amp.dev/static/samples/img/image2.jpg",
                          "style": "greenBorder"
                        },
                        "sushi": {
                          "imageUrl": "https://amp.dev/static/samples/img/image3.jpg",
                          "style": "redBorder"
                        }
                      }
                    </script>`,
                }}
              />
            </amp-state>
            <p data-amp-bind-text="'I want to eat ' + currentMeal + '.'">
              this is a cupcake
            </p>
            <button on="tap:AMP.setState({currentMeal: 'sushi'})">
              Set to sushi
            </button>
            <button on="tap:AMP.setState({currentMeal: 'cupcakes'})">
              Set to Cupcake
            </button>
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
