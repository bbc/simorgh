import React from 'react';
import {
  getPica,
  getGreatPrimer,
  getLongPrimer,
} from '#psammead/gel-foundations/src/typography';
import {
  getSansRegular,
  getSerifMedium,
} from '#psammead/psammead-styles/src/font-styles';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import LiveLabel from '#app/components/LiveLabel';
import { Link } from '#psammead/psammead-story-promo/src';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import ImageGridItem from './ImageStyles';
import TextGridItem from './TextStyles';

const RadioBulletinWrapper = ({ children, ...props }) => (
  <div
    className="relative bg-lunar grid grid-cols-6 gap-double"
    {...props}
  >
    {children}
  </div>
);

const TVBulletinWrapper = ({ children, ...props }) => (
  <div
    className="relative bg-lunar grid grid-cols-6 gap-double group-3:p-double"
    {...props}
  >
    {children}
  </div>
);

const BulletinHeading = ({ script, service, bulletinType, dir, children, ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? (bulletinType === 'tv' ? getGreatPrimer(script) : getPica(script)) : {};
  const serviceStyles = service ? getSerifMedium(service) : {};
  
  const radioClasses = bulletinType === 'radio' ? 'group-3:max-group-3:py-full group-3:max-group-3:px-0' : '';
  const tvClasses = bulletinType === 'tv' ? 'group-3:p-0 group-3:pb-full' : '';
  
  return (
    <h3
      className={`text-ebon m-0 p-full ${radioClasses} ${tvClasses}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </h3>
  );
};

const BulletinSummary = ({ script, service, bulletinType, dir, children, ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getLongPrimer(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  const radioClasses = bulletinType === 'radio' ? 'group-3:max-group-3:px-0' : '';
  const tvClasses = bulletinType === 'tv' ? 'group-3:px-0' : '';
  
  return (
    <p
      className={`text-shadow m-0 px-full pb-double ${radioClasses} ${tvClasses}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </p>
  );
};

const IconWrapper = ({ dir, children, ...props }) => {
  const paddingClass = dir === 'ltr' ? 'pr-full' : 'pl-full';
  
  return (
    <span
      className={`flex items-center ${paddingClass} [&>svg]:text-white [&>svg]:fill-current [&>svg]:w-[1.0625rem] [&>svg]:h-double [&>svg]:m-0`}
      {...props}
    >
      {children}
    </span>
  );
};

const PlayCTA = ({ isLive, script, service, bulletinType, dir, children, ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getPica(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  const bgColor = isLive ? 'bg-postbox' : 'bg-ebon';
  const radioClasses = bulletinType === 'radio' ? 'group-3:max-group-3:inline-flex group-3:max-group-3:py-full group-3:max-group-3:px-double group-3:max-group-3:mb-double' : '';
  const tvClasses = bulletinType === 'tv' ? 'group-3:inline-flex group-3:py-full group-3:px-double' : '';
  
  return (
    <div
      className={`${bgColor} border border-transparent text-white p-3 flex items-center justify-center ${radioClasses} ${tvClasses}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
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
