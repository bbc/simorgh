/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
  AMP_SCRIPT_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';
import generateCSPHash from '../utilities/generateCSPHash';
import { Direction } from '../../../models/types/global';
import { Size } from '../types';
import styles from './index.styles';
import getRemoteDataScript from './getRemoteDataScript';

interface AmpMostReadProps {
  endpoint: string;
  size?: Size;
}

const AmpMostRead = ({ endpoint, size = 'default' }: AmpMostReadProps) => {
  const {
    service,
    dir,
    mostRead: { numberOfItems },
    translations,
  } = useContext(ServiceContext);

  const onlyinnerscript = getRemoteDataScript({ endpoint, service });

  const fallbackText = pathOr(
    'Content is not available',
    ['socialEmbed', 'fallback', 'text'],
    translations,
  );

  const direction = dir as Direction;

  return (
    <amp-script id="dataFunctions" script="local-script">
      <Helmet
        script={[
          {
            id: 'local-script',
            type: 'text/plain',
            target: 'amp-script',
            innerHTML: onlyinnerscript,
          },
        ]}
      />
      <Helmet>
        {/* Import required amp scripts for most read */}
        {AMP_LIST_JS}
        {AMP_MUSTACHE_JS}
        {AMP_SCRIPT_JS}
        <meta
          name="amp-script-src"
          content={generateCSPHash({
            script: onlyinnerscript,
            sha: 'sha384',
            encoding: 'utf8',
            base: 'base64',
          })}
        />
      </Helmet>
      <amp-list
        src="amp-script:dataFunctions.getRemoteData"
        items="items"
        max-items={numberOfItems}
        layout="responsive"
        width="300"
        height="50"
      >
        <p css={styles.paragraph} fallback="">
          {fallbackText}
        </p>

        <template type="amp-mustache">
          <MostReadItemWrapper dir={direction} columnLayout="oneColumn">
            <MostReadRank
              service={service}
              numberOfItems={numberOfItems}
              listIndex="{{rankTranslation}}"
              dir={direction}
              columnLayout="oneColumn"
              size={size}
              isAmp
            />
            <MostReadLink
              dir={direction}
              service={service}
              title="{{title}}"
              href="{{href}}"
              size={size}
            />
          </MostReadItemWrapper>
        </template>
      </amp-list>
    </amp-script>
  );
};

export default AmpMostRead;
