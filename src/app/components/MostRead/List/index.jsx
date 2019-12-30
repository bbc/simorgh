import React from 'react';
import styled from 'styled-components';
import { shape, string, oneOf } from 'prop-types';
import {
  Burmese,
  Bengali,
  EasternArabic,
  WesternArabic,
} from '@bbc/psammead-locales/numerals';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import Grid from '@bbc/psammead-grid';
import { MostReadLink, MostReadRankWrapper } from '../Item';
import { itemsPropTypes } from '../testHelpers/itemsHelper';

const MostReadItemProps = {
  item: true,
  columns: {
    group0: 6,
    group1: 6,
    group2: 3,
    group3: 3,
    group4: 4,
    group5: 4,
  },
};

const MostReadListProps = {
  enableGelGutters: true,
  enableGelMargins: true,
  columns: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 20,
  },
};

const serviceNumerals = service => {
  const servicesNonWesternNumerals = {
    arabic: EasternArabic,
    bengali: Bengali,
    burmese: Burmese,
    pashto: EasternArabic,
    persian: EasternArabic,
    urdu: EasternArabic,
  };
  return servicesNonWesternNumerals[service]
    ? servicesNonWesternNumerals[service]
    : WesternArabic;
};

const StyledOl = styled.ol.attrs({
  role: 'list',
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

const StyledGrid = styled(Grid)`
  grid-auto-flow: column;
  grid-template-rows: repeat(
    ${props => Math.ceil(props.items.length / 2)},
    [col-start] auto [col-end]
  );
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    grid-template-rows: repeat(
      ${props => props.items.length},
      [col-start] auto [col-end]
    );
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-auto-flow: row;
    grid-template-rows: repeat(
      ${props => Math.floor(props.items.length / 2)},
      [col-start] auto [col-end]
    );
  }
`;

const renderMostReadRank = (service, script, index, items, dir) => {
  const numerals = serviceNumerals(service);
  const rank = numerals[index + 1];
  return (
    <MostReadRankWrapper
      service={service}
      script={script}
      rank={rank}
      listIndex={index}
      items={items}
      dir={dir}
    />
  );
};

const MostReadList = ({ items, service, script, dir }) => (
  <StyledOl>
    <StyledGrid {...MostReadListProps} dir={dir} items={items}>
      {items.map((item, i) => (
        <Grid key={item.id} {...MostReadItemProps} dir={dir} forwardedAs="li">
          <StyledLi>
            {renderMostReadRank(service, script, i, items, dir)}
            <MostReadLink
              dir={dir}
              item={item}
              service={service}
              script={script}
            />
          </StyledLi>
        </Grid>
      ))}
    </StyledGrid>
  </StyledOl>
);

MostReadList.propTypes = {
  items: itemsPropTypes.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

MostReadList.defaultProps = {
  dir: 'ltr',
};

export default MostReadList;
