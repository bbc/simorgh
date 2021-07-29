import React, { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { C_METAL, C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { getSansRegular, getSansBold } from '@bbc/psammead-styles/font-styles';
import { object } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '#containers/Blocks';
import unorderedList from '../BulletedList';
import Text from '#containers/CpsText';

const GistWrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  color: ${C_METAL};
  border-top: ${GEL_SPACING_HLF} solid ${C_POSTBOX};
  background-color: ${C_WHITE};
  padding-top: ${GEL_SPACING_QUAD};
  padding-bottom: ${GEL_SPACING_QUAD};
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-left: ${GEL_SPACING_QUAD};`
      : `padding-right: ${GEL_SPACING_QUAD};`}
`;

const GistIntroduction = styled.strong`
  ${({ service }) => getSansBold(service)}
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
  const { service, dir, translations } = useContext(ServiceContext);
  const gistTitle = pathOr('At a glance', ['gist'], translations);
  return (
    <GistWrapper service={service} dir={dir}>
      <GistIntroduction service={service}>{gistTitle}</GistIntroduction>
      <Blocks
        blocks={path(['model', 'blocks'], gistData)}
        componentsToRender={componentsToRender}
      />
    </GistWrapper>
  );
};

Gist.propTypes = {
  // Add shape
  // eslint-disable-next-line react/forbid-prop-types
  gistData: object.isRequired,
};

export default Gist;
