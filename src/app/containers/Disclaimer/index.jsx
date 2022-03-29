import React, { useContext } from 'react';
import { bool } from 'prop-types';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import Paragraph from '@bbc/psammead-paragraph';
import { getSansLight } from '@bbc/psammead-styles/font-styles';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { C_GREY_6, C_GREY_2 } from '@bbc/psammead-styles/colours';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GridItemLarge } from '#app/components/Grid';

import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import isEmpty from 'ramda/src/isEmpty';
import InlineLink from '../InlineLink';

const Inner = styled.section`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => service && getSansLight(service)}
  background: ${C_GREY_2};
  color: ${C_GREY_6};
  text-transform: uppercase;
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

const DisclaimerP = styled(Paragraph)`
  padding: 0;
`;

const DisclaimerComponent = ({ increasePaddingOnDesktop }) => {
  const { service, script, disclaimer, translations } =
    useContext(ServiceContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = enabled && disclaimer && !isEmpty(disclaimer);

  if (!shouldShow) return null;

  const disclaimerLabelTranslation = pathOr(
    'Disclaimer',
    ['disclaimerLabel'],
    translations,
  );

  return (
    <GridItemLarge>
      <Inner
        service={service}
        script={script}
        increasePaddingOnDesktop={increasePaddingOnDesktop}
        role="region"
        aria-label={disclaimerLabelTranslation}
      >
        <DisclaimerP>
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
                      id: `disclaimerLink-${index}`,
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
        </DisclaimerP>
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
