import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
  GEL_SPACING_TRPL,
  GEL_SPACING_HLF_TRPL,
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
import { GridItemLarge } from '#app/components/Grid';

const GistWrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getDoublePica(script)}
  color: ${C_METAL};
  border-top: ${GEL_SPACING_HLF} solid ${C_POSTBOX};
  background-color: ${C_WHITE};
  padding-top: ${GEL_SPACING_TRPL};
  padding-bottom: ${0};
  margin-bottom: ${GEL_SPACING_QUAD};
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-left: ${GEL_SPACING_DBL};`
      : `padding-right: ${GEL_SPACING_DBL};`}

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_QUAD};
    ${({ dir }) =>
      dir === 'ltr'
        ? `padding-left: ${GEL_SPACING_QUAD};`
        : `padding-right: ${GEL_SPACING_QUAD};`}
  }
`;

const GistIntroduction = styled.strong`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getDoublePica(script)}
  display: inline-block;
  padding-bottom: ${GEL_SPACING_DBL};
`;

const GistList = styled(UnorderedList)`
  margin-bottom: 0;
  ul {
    ${({ dir }) =>
      dir === 'ltr'
        ? `padding-left: ${GEL_SPACING};`
        : `padding-right: ${GEL_SPACING};`}
  }
  li {
    ${({ script }) => getGreatPrimer(script)}

    margin-bottom: ${GEL_SPACING_HLF_TRPL};
    &:last-child {
      padding-bottom: ${GEL_SPACING_DBL};
    }
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
    li {
      &:last-child {
        padding-bottom: ${GEL_SPACING_QUAD};
      }
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

const componentsToRender = (script, dir) => ({
  text: props => (
    <Text
      {...props}
      componentsToRender={{
        unorderedList: innerProps => (
          <GistList
            {...innerProps}
            script={script}
            dir={dir}
            bulletPointShape="square"
            bulletPointColour={C_METAL}
          />
        ),
      }}
    />
  ),
});

const Gist = ({ blocks }) => {
  const { service, script, dir, translations } = useContext(ServiceContext);
  const gistTitle = pathOr('At a glance', ['gist'], translations);
  return (
    <GridItemLarge role="region" aria-labelledby="gist-title">
      <GistWrapper service={service} script={script} dir={dir}>
        <GistIntroduction service={service} script={script} id="gist-title">
          {gistTitle}
        </GistIntroduction>
        <Blocks
          blocks={blocks}
          componentsToRender={componentsToRender(script, dir)}
        />
      </GistWrapper>
    </GridItemLarge>
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
