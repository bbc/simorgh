/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { use } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Promo from '../Promo';
import styles from './index.styles';

const PromoList = ({ blocks, viewTracker, clickTracker, a11yAttributes }) => {
  const { dir } = use(ServiceContext);
  const isOperaMini = useOperaMiniDetection();
  const listBlocks = blocks.slice(0, 5);

  return (
    <ul
      css={[isOperaMini ? styles.operaScrollPromo : styles.standardScrollPromo]}
      dir={dir}
      role="list"
      {...viewTracker}
      {...a11yAttributes}
    >
      {listBlocks.map((block, index) => {
        return (
          <li
            css={[isOperaMini ? styles.operaStyledList : styles.list]}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            dir={dir}
          >
            <Promo block={block} clickTracker={clickTracker} />
          </li>
        );
      })}
    </ul>
  );
};

export default PromoList;
