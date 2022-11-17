import React, { useContext } from 'react';
import { bool } from 'prop-types';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { getSansLight } from '#psammead/psammead-styles/src/font-styles';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import { C_GREY_6, C_GREY_2 } from '#psammead/psammead-styles/src/colours';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { GridItemLarge } from '#components/Grid';

import useToggle from '#hooks/useToggle';
import isEmpty from 'ramda/src/isEmpty';
import { ServiceContext } from '../../../contexts/ServiceContext';
import InlineLink from '../InlineLink';

const InfoBanner = styled.p`
  padding: 0;
`;

const Inner = styled.section`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => service && getSansLight(service)}
  background: ${C_GREY_2};
  color: ${C_GREY_6};
  margin-bottom: ${GEL_SPACING_TRPL};
  padding: ${GEL_SPACING_DBL};
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    line-height: 1.4;
  }
  ${({ increasePaddingOnDesktop }) =>
    increasePaddingOnDesktop &&
    `
      @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
        padding: ${GEL_SPACING_DBL} ${GEL_SPACING_QUIN};
      }
    `}
`;

const DisclaimerComponent = ({ increasePaddingOnDesktop }) => {
  const { service, script, disclaimer, translations } =
    useContext(ServiceContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = enabled && disclaimer && !isEmpty(disclaimer);

  if (!shouldShow) return null;

  const infoBannerLabelTranslation = pathOr(
    'Information',
    ['infoBannerLabel'],
    translations,
  );

  return (
    <GridItemLarge>
      <Inner
        service={service}
        script={script}
        increasePaddingOnDesktop={increasePaddingOnDesktop}
        role="region"
        aria-label={infoBannerLabelTranslation}
      >
        <InfoBanner>
          {disclaimer &&
            Object.values(disclaimer).map((para, index) => {
              const linkText = path(['text'], para);
              const linkUrl = path(['url'], para);
              const isExternalLink = path(['isExternal'], para);
              return linkUrl ? (
                <InlineLink
                  key={linkText}
                  locator={linkUrl}
                  blocks={[
                    {
                      id: `infoBannerLink-${index}`,
                      type: 'fragment',
                      model: { text: linkText, attributes: [] },
                    },
                  ]}
                  isExternal={isExternalLink}
                />
              ) : (
                para
              );
            })}
        </InfoBanner>
      </Inner>
    </GridItemLarge>
  );
};

DisclaimerComponent.propTypes = {
  increasePaddingOnDesktop: bool,
};

DisclaimerComponent.defaultProps = {
  increasePaddingOnDesktop: true,
};

export default DisclaimerComponent;
