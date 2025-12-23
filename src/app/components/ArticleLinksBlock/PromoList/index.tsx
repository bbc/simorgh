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
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { OptimoBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Promo from '../Promo';

const StandardScrollPromo = styled.ul`
  list-style: none;
  ${({ dir }) => `padding-${dir === 'ltr' ? 'left' : 'right'}: 0;`}
  margin: 0;
  display: flex;
  overflow-x: scroll;
  /* Avoid using smooth scrolling as it causes accessibility issues */
  scroll-behavior: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OperaScrollPromo = styled.ul`
  list-style: none;
  ${({ dir }) => `padding-${dir === 'ltr' ? 'left' : 'right'}: 0;`}
  margin: 0;
`;

const StyledList = styled.li`
  display: flex;
  flex-shrink: 0;

  ${({ dir }) =>
    `
      @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}){
        margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING};
        &:first-child {
          margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING};
        }
        &:last-child {
          margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING};
        }
      }
      @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}){
        margin-${dir === 'ltr' ? `left` : `right`}: ${GEL_SPACING_DBL};  

        &:first-child {
          margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING_DBL};
        }
      }
      @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}){
          margin-${dir === 'ltr' ? `left` : `right`}: ${GEL_SPACING_DBL};
          &:first-child {
            margin-${dir === 'ltr' ? 'left' : 'right'}: 0;
          }
      }
  `}
`;

const OperaStyledList = styled.li`
  ${({ dir }) => `@media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}){
      margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING};
    }
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}){
      margin-${dir === 'ltr' ? `left` : `right`}: ${GEL_SPACING_DBL};   
    }
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}){
      margin-${dir === 'ltr' ? `left` : `right`}: 0;}`}
`;

interface PromoListProps {
  blocks: OptimoBlock[];
  eventTrackingData?: EventTrackingMetadata;
}

const PromoList = ({
  blocks,
  eventTrackingData,
  // viewTracker,
}: PromoListProps) => {
  const { dir } = use(ServiceContext);
  const isOperaMini = useOperaMiniDetection();
  const listBlocks = blocks.slice(0, 3);

  const ScrollPromo = isOperaMini ? OperaScrollPromo : StandardScrollPromo;
  const List = isOperaMini ? OperaStyledList : StyledList;

  return (
    <ScrollPromo
      dir={dir}
      role="list"
      isOperaMini={isOperaMini}
      // {...viewTracker}
      // {...a11yAttributes}
    >
      {listBlocks.map((block, index) => {
        return (
          <List
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            dir={dir}
          >
            <Promo block={block} eventTrackingData={eventTrackingData} />
          </List>
        );
      })}
    </ScrollPromo>
  );
};

export default PromoList;
