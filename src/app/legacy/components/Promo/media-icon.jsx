import moment from 'moment-timezone';
import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_1_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import formatDuration from '#lib/utilities/formatDuration';

export const TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  PHOTO_GALLERY: 'photogallery',
};
// CANONICAL
// GROUP 0 = BACKGROUND - EBON, COLOR - WHITE
// GROUP 1 = BACKGROUND - EBON, COLOR - WHITE
// GROUP 2 = BACKGROUND - WHITE, COLOR - EBON
// GROUP 3 = BACKGROUND - WHITE, COLOR - EBON
// GROUP 4 = BACKGROUND - WHITE, COLOR - EBON
// GROUP 5 = BACKGROUND - WHITE, COLOR - EBON
// LITE
// GROUP 0 = BACKGROUND - BLACK, COLOR - WHITE
// GROUP 1 = BACKGROUND - BLACK, COLOR - WHITE
// GROUP 2 = BACKGROUND - BLACK, COLOR - WHITE
// GROUP 3 = BACKGROUND - BLACK, COLOR - WHITE
// GROUP 4 = BACKGROUND - BLACK, COLOR - WHITE
// GROUP 5 = BACKGROUND - BLACK, COLOR - WHITE
const Wrapper = styled.div`
  padding: ${GEL_SPACING_HLF};
  color: ${props =>
    props.theme.isLite ? props.theme.palette.WHITE : props.theme.palette.EBON};
  background-color: ${props =>
    props.theme.isLite
      ? props.theme.palette.GREY_10
      : props.theme.palette.WHITE};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.minion};
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    color: ${({ theme }) =>
      theme.isDarkUi ? theme.palette.WHITE : theme.palette.EBON};
    background-color: ${({ theme }) =>
      theme.isDarkUi ? theme.palette.GREY_10 : theme.palette.WHITE};
  }
`;

const StyledTime = styled.time`
  padding: ${GEL_SPACING_HLF};
  position: relative;
  top: 0.09rem;
`;

const formatChildren = children => {
  if (!children) return null;
  const duration = moment.duration(children, 'seconds');
  const durationString = formatDuration({ duration });
  const isoDuration = duration.toISOString();
  return (
    <StyledTime dateTime={isoDuration} suppressHydrationWarning>
      {durationString}
    </StyledTime>
  );
};

const MediaIcon = ({ children, type, className = '' }) => {
  if (!type || !mediaIcons[type]) return null;
  return (
    <Wrapper aria-hidden="true" className={className} data-e2e="media-icon">
      {mediaIcons[type]}
      {formatChildren(children)}
    </Wrapper>
  );
};

export default MediaIcon;
