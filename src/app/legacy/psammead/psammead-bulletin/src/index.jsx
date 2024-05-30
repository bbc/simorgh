import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  getSansRegular,
  getSerifMedium,
} from '#psammead/psammead-styles/src/font-styles';
import {
  getPica,
  getGreatPrimer,
  getLongPrimer,
} from '#psammead/gel-foundations/src/typography';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import LiveLabel from '#app/components/LiveLabel';
import { Link } from '#psammead/psammead-story-promo/src';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import ImageGridItem from './ImageStyles';
import TextGridItem from './TextStyles';

const bulletinWrapperStyles = ({ theme }) => `
  position: relative;
  background-color: ${theme.palette.LUNAR};
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: ${`${theme.spacings.DOUBLE}rem`};
`;

const RadioBulletinWrapper = styled.div`
  ${bulletinWrapperStyles};
  background-color: ${props => props.theme.palette.LUNAR};
`;

const TVBulletinWrapper = styled.div`
  ${bulletinWrapperStyles};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL};
  }
`;

const headingStyles = ({ service, theme }) => `
  color: ${theme.palette.EBON};
  margin: 0; /* Reset */
  padding: ${GEL_SPACING};
  ${service && getSerifMedium(service)}
`;

const radioHeading = ({ script, dir }) => `
  ${script && getPica(script)}
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-top: ${GEL_SPACING};
    padding-bottom: ${GEL_SPACING};
    ${dir === 'ltr' ? `padding-left: 0;` : `padding-right: 0;`}
  }
`;

const tvHeading = ({ script }) => `
  ${script && getGreatPrimer(script)}
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0 0 ${GEL_SPACING} 0;
  }
`;

const bulletinHeadinStyles = {
  radio: radioHeading,
  tv: tvHeading,
};

const BulletinHeading = styled.h3`
  ${headingStyles}
  ${({ bulletinType }) => bulletinHeadinStyles[bulletinType]}
`;

const radioSummary = ({ dir }) => `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    ${dir === 'ltr' ? 'padding-left: 0;' : 'padding-right: 0;'}
  }
`;

const tvSummary = ({ dir, bulletinType }) => `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${
      dir === 'ltr'
        ? `
            padding-left: 0;
            ${bulletinType === 'tv' && 'padding-right: 0;'}
          `
        : `
            padding-right: 0;
            ${bulletinType === 'tv' && 'padding-left: 0;'}
          `
    }
  }
`;

const bulletinSummaryStyles = {
  radio: radioSummary,
  tv: tvSummary,
};

const BulletinSummary = styled.p`
  color: ${props => props.theme.palette.SHADOW};
  margin: 0; /* Reset */
  padding: 0 ${GEL_SPACING} ${GEL_SPACING_DBL};
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => service && getSansRegular(service)} 
  ${({ bulletinType }) => bulletinSummaryStyles[bulletinType]}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  > svg {
    color: ${props => props.theme.palette.WHITE};
    fill: currentColor;
    width: 1.0625rem;
    height: ${GEL_SPACING_DBL};
    margin: 0;
  }
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-right: ${GEL_SPACING};`
      : `padding-left: ${GEL_SPACING};`}
`;

const radioPlayCta = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: inline-flex;
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
    margin-bottom: ${GEL_SPACING_DBL};
  }
`;

const tvPlayCta = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: inline-flex;
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
`;

const playCtaStyles = {
  radio: radioPlayCta,
  tv: tvPlayCta,
};

const PlayCTA = styled.div`
  background-color: ${({ isLive }) =>
    props =>
      isLive ? props.theme.palette.POSTBOX : props.theme.palette.EBON};
  border: 0.0625rem solid transparent;
  color: ${props => props.theme.palette.WHITE};
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSansRegular(service)};
  ${({ bulletinType }) => playCtaStyles[bulletinType]}
`;

PlayCTA.defaultProps = {
  'aria-hidden': true,
};

const Bulletin = ({
  script,
  service,
  dir = 'ltr',
  image = null,
  mediaType,
  headlineText,
  summaryText = null,
  ctaLink,
  ctaText,
  isLive = false,
  liveText = 'LIVE',
  offScreenText,
  lang = null,
  ariaId,
}) => {
  const sanitisedAriaId = ariaId ? ariaId.replace(/\W/g, '') : null;
  const isAudio = mediaType === 'audio';
  const bulletinType = isAudio ? 'radio' : 'tv';
  const BulletinWrapper = isAudio ? RadioBulletinWrapper : TVBulletinWrapper;
  // aria-labelledby in <Link..., and id={`bulletin-${sanitisedAriaId}`} in LiveLabel and span are temporary fixes for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
  return (
    <BulletinWrapper>
      {image && (
        <ImageGridItem bulletinType={bulletinType}>{image}</ImageGridItem>
      )}
      <TextGridItem bulletinType={bulletinType} fullWidth={!image} dir={dir}>
        <BulletinHeading
          script={script}
          service={service}
          bulletinType={bulletinType}
          dir={dir}
        >
          <Link
            className="focusIndicatorDisplayBlock"
            href={ctaLink}
            aria-labelledby={`bulletin-${sanitisedAriaId}`}
          >
            {isLive ? (
              <LiveLabel
                liveText={liveText}
                ariaHidden
                offScreenText={offScreenText}
                id={`bulletin-${sanitisedAriaId}`}
              >
                {headlineText}
              </LiveLabel>
            ) : (
              // eslint-disable-next-line jsx-a11y/aria-role
              <span role="text" id={`bulletin-${sanitisedAriaId}`}>
                {offScreenText && (
                  <VisuallyHiddenText lang={lang}>
                    {`${offScreenText}, `}
                  </VisuallyHiddenText>
                )}
                <span>{headlineText}</span>
              </span>
            )}
          </Link>
        </BulletinHeading>
        {summaryText && (
          <BulletinSummary
            script={script}
            service={service}
            bulletinType={bulletinType}
            dir={dir}
          >
            {summaryText}
          </BulletinSummary>
        )}
        <PlayCTA
          isLive={isLive}
          service={service}
          script={script}
          bulletinType={bulletinType}
          dir={dir}
        >
          <IconWrapper dir={dir}>{mediaIcons[mediaType]}</IconWrapper>
          {ctaText}
        </PlayCTA>
      </TextGridItem>
    </BulletinWrapper>
  );
};

export default Bulletin;
