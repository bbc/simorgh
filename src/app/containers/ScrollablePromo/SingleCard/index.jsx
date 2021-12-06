import React from 'react';
import { string, oneOf, shape, object } from 'prop-types';
import styled from '@emotion/styled';
import { pathOr } from 'ramda';

import { getPica } from '@bbc/gel-foundations/dist/typography';
import { getSerifBold } from '@bbc/psammead-styles/dist/font-styles';
import { GEL_GROUP_1_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/dist/spacings';
import { C_GREY_6 } from '@bbc/psammead-styles/dist/colours';

import { scriptPropType } from '@bbc/gel-foundations/prop-types';

const C_GREY_8 = '#202224';
// padding? widhth? height? different for phones?
const SingleCardBox = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  width: 14.8125rem;
  min-height: 5.75rem;
  background-color: yellow;
  padding: ${GEL_SPACING_DBL};
  margin: 0 0 0 ${GEL_SPACING_DBL};

  /* phone gap 8px */
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    margin: 0 0 0 ${GEL_SPACING};
  }

  /* gap for older browser */
  &: ${({ dir }) => (dir === 'ltr' ? 'first' : 'last')}-child {
    margin: 0;
  }
`;

// import Grey_8 in Psammead
const LinkWrapper = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSerifBold(service)};

  line-height: 1.25;
  ${({ dir }) =>
    dir === 'ltr'
      ? 'align-self:flex-start;direction: ltr;'
      : 'align-self:flex-end;direction: rtl;'}

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  &:hover {
    text-decoration: underline;
  }
  &:focus {
    text-decoration: underline;
  }

  color: ${C_GREY_8};
  &:visited {
    color: ${C_GREY_6};
  }
`;

const SingleCard = ({ block, dir, service, script }) => {
  const title = pathOr(
    '',
    [
      'model',
      'blocks',
      '1',
      'model',
      'blocks',
      '0',
      'model',
      'blocks',
      '0',
      'model',
      'text',
    ],
    block,
  );
  const href = pathOr(
    '',
    [
      'model',
      'blocks',
      '1',
      'model',
      'blocks',
      '0',
      'model',
      'blocks',
      '0',
      'model',
      'locator',
    ],
    block,
  );

  return (
    <SingleCardBox dir={dir}>
      <LinkWrapper href={href} service={service} script={script} dir={dir}>
        {title}
      </LinkWrapper>
    </SingleCardBox>
  );
};

SingleCard.propTypes = {
  dir: oneOf(['ltr', 'rtl']).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  block: object.isRequired,
};

export default SingleCard;
