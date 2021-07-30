import React, { useContext } from 'react';
import path from 'ramda/src/path';
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
import { getPica, getGreatPrimer } from '@bbc/gel-foundations/typography';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { string, arrayOf, shape } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '#containers/Blocks';
import unorderedList from '../BulletedList';
import Text from '#containers/CpsText';

const GistWrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getPica(script)}
  color: ${C_METAL};
  border-top: ${GEL_SPACING_HLF} solid ${C_POSTBOX};
  background-color: ${C_WHITE};
  padding-top: ${GEL_SPACING_QUAD};
  padding-bottom: ${GEL_SPACING_QUAD};
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-left: ${GEL_SPACING_DBL};`
      : `padding-right: ${GEL_SPACING_DBL};`}
  ul {
    padding-inline-start: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    ul {
      padding-inline-start: 0;
    }
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ${({ dir }) =>
      dir === 'ltr'
        ? `padding-left: ${GEL_SPACING_QUAD};`
        : `padding-right: ${GEL_SPACING_QUAD};`}
    ul {
      padding-inline-start: ${GEL_SPACING_DBL};
    }
  }
`;

const GistIntroduction = styled.strong`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getGreatPrimer(script)}
  display: inline-block;
  padding-bottom: ${GEL_SPACING_DBL};
`;

const componentsToRender = {
  text: props => (
    <Text
      {...props}
      componentsToRender={{
        unorderedList,
        orderedList: unorderedList,
      }}
    />
  ),
};

const Gist = ({ gistData }) => {
  const { service, script, dir, translations } = useContext(ServiceContext);
  const gistTitle = pathOr('At a glance', ['gist'], translations);
  return (
    <GistWrapper service={service} script={script} dir={dir}>
      <GistIntroduction service={service} script={script}>
        {gistTitle}
      </GistIntroduction>
      <Blocks
        blocks={path(['model', 'blocks'], gistData)}
        componentsToRender={componentsToRender}
      />
    </GistWrapper>
  );
};

Gist.propTypes = {
  gistData: shape({
    model: shape({
      intentType: string.isRequired,
      relationshipType: string.isRequired,
      blocks: arrayOf(
        shape({
          type: string.isRequired,
          id: string.isRequired,
        }),
      ),
    }),
  }).isRequired,
};

export default Gist;
