import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { C_METAL, C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { getSansRegular, getSansBold } from '@bbc/psammead-styles/font-styles';
import { getDoublePica, getGreatPrimer } from '@bbc/gel-foundations/typography';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { string, arrayOf, shape } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '#containers/Blocks';
import UnorderedList from '../BulletedList';
import Text from '#containers/CpsText';
import { GridItemMedium } from '#app/components/Grid';

const GistWrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getGreatPrimer(script)}
  color: ${C_METAL};
  border-top: ${GEL_SPACING_HLF} solid ${C_POSTBOX};
  background-color: ${C_WHITE};
  padding-top: ${GEL_SPACING_QUAD};
  padding-bottom: ${GEL_SPACING};
  margin-bottom: ${GEL_SPACING_QUAD};
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-left: ${GEL_SPACING_DBL};`
      : `padding-right: ${GEL_SPACING_DBL};`}
  ul {
    ${({ dir }) =>
      dir === 'ltr'
        ? `padding-left: ${GEL_SPACING};`
        : `padding-right: ${GEL_SPACING};`}
  }
  ul > li {
    margin-bottom: 10px;
    ${({ dir }) =>
      dir === 'ltr'
        ? `padding-left: ${GEL_SPACING};`
        : `padding-right: ${GEL_SPACING};`}
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    ul {
      ${({ dir }) => (dir === 'ltr' ? `padding-left: 0;` : `padding-right: 0;`)}
    }
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${({ dir }) =>
      dir === 'ltr'
        ? `padding-left: ${GEL_SPACING_QUAD};`
        : `padding-right: ${GEL_SPACING_QUAD};`}
    ul > li {
      ${({ dir }) =>
        dir === 'ltr'
          ? `padding-left: ${GEL_SPACING_DBL};`
          : `padding-right: ${GEL_SPACING_DBL};`}
    }
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ul {
      ${({ dir }) =>
        dir === 'ltr'
          ? `padding-left: ${GEL_SPACING_DBL};`
          : `padding-right: ${GEL_SPACING_DBL};`}
    }
  }
`;

const GistIntroduction = styled.strong`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getDoublePica(script)}
  display: inline-block;
  padding-bottom: ${GEL_SPACING_DBL};
`;

const componentsToRender = {
  text: props => (
    <Text
      {...props}
      componentsToRender={{
        unorderedList: innerProps => (
          <UnorderedList
            {...innerProps}
            bulletPointShape="square"
            bulletPointColour={C_METAL}
          />
        ),
      }}
    />
  ),
};

const Gist = ({ blocks }) => {
  const { service, script, dir, translations } = useContext(ServiceContext);
  const gistTitle = pathOr('At a glance', ['gist'], translations);
  return (
    <GridItemMedium>
      <GistWrapper service={service} script={script} dir={dir}>
        <GistIntroduction service={service} script={script}>
          {gistTitle}
        </GistIntroduction>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </GistWrapper>
    </GridItemMedium>
  );
};

Gist.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      id: string.isRequired,
    }),
  ).isRequired,
};

export default Gist;
