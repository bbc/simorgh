import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
  GEL_SPACING_TRPL,
  GEL_SPACING_HLF_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  C_POSTBOX,
  C_WHITE,
  C_GREY_6,
} from '#psammead/psammead-styles/src/colours';
import {
  getSansRegular,
  getSansBold,
} from '#psammead/psammead-styles/src/font-styles';
import {
  getDoublePica,
  getGreatPrimer,
} from '#psammead/gel-foundations/src/typography';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import { string, arrayOf, shape } from 'prop-types';
import Blocks from '#containers/Blocks';
import Text from '#containers/Text';
import { GridItemLarge } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import UnorderedList from '../BulletedList';

const GistWrapper = styled.div`
  color: ${C_GREY_6};
  border-top: ${GEL_SPACING_HLF} solid ${C_POSTBOX};
  background-color: ${C_WHITE};
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding: ${GEL_SPACING_TRPL} ${GEL_SPACING_TRPL} 0 ${GEL_SPACING_DBL};`
      : `padding: ${GEL_SPACING_TRPL} ${GEL_SPACING_DBL} 0 ${GEL_SPACING_TRPL};`}
  margin-bottom: ${GEL_SPACING_QUAD};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_QUAD} ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_QUAD};
  }
`;

const GistIntroduction = styled.strong`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getDoublePica(script)}
  display: inline-block;
  padding-bottom: ${GEL_SPACING_TRPL};
`;

const GistList = styled(UnorderedList)`
  margin-bottom: 0;
  padding: 0;

  ul {
    padding: 0;
  }

  li {
    ${({ service }) => getSansRegular(service)}
    ${({ script }) => getGreatPrimer(script)}
    ${({ direction }) => `padding-${direction}: ${GEL_SPACING_HLF_TRPL};`}
    margin-bottom: ${GEL_SPACING_DBL};
    &:last-child {
      padding-bottom: ${GEL_SPACING_DBL};
    }
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${({ direction }) => `padding-${direction}: ${GEL_SPACING_DBL};`}
    li:last-child {
      padding-bottom: ${GEL_SPACING_QUAD};
    }
  }
`;

const componentsToRender = (service, script, dir) => ({
  text: props => (
    <Text
      {...props}
      componentsToRender={{
        unorderedList: innerProps => (
          <GistList
            {...innerProps}
            service={service}
            script={script}
            direction={dir === 'rtl' ? 'right' : 'left'}
            bulletPointShape="square"
            bulletPointColour={C_GREY_6}
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
          componentsToRender={componentsToRender(service, script, dir)}
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
