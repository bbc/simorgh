import React, { use } from 'react';
import omit from 'ramda/src/omit';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import { RequestContext } from '../../../contexts/RequestContext';
import { withEpisodeContext } from './helpers';

const LitePlayWrapper = withEpisodeContext(({ children, theme, ...props }) => (
  <div
    {...props}
    className="p-half group-2:p-full [&_svg]:mb-px [&_svg]:h-2 [&_svg]:w-3 [&_svg]:text-white [&_svg]:forced-colors:fill-[linkText]"
  >
    {children}
  </div>
));

const PlayWrapper = withEpisodeContext(({ children, theme, ...props }) => (
  <div
    {...props}
    className="bg-ebon p-half group-2:p-full [&_svg]:mb-px [&_svg]:h-2 [&_svg]:w-3 [&_svg]:text-white [&_svg]:forced-colors:fill-[linkText] group-2:absolute group-2:bottom-0"
  >
    {children}
  </div>
));

const DurationWrapper = withEpisodeContext(({ children, script, service, theme, dir, ...props }) => (
  <span
    {...props}
    className={`text-minion text-white ${
      dir === 'rtl' ? 'pr-half' : 'pl-half'
    }`}
  >
    {children}
  </span>
));

const EpisodeImage = props => {
  const { duration = '', alt = '', dir } = props;

  const { isLite } = use(RequestContext);

  // This component only uses a subset of its props
  // the remaining props are passed down to the underlying <img> element
  const selectImgProps = omit([
    'alt',
    'duration',
    'classname',
    'script',
    'service',
  ]);

  return isLite ? (
    <div>
      <LitePlayWrapper aria-hidden="true">
        {mediaIcons.video}
        {duration && <DurationWrapper>{duration}</DurationWrapper>}
      </LitePlayWrapper>
    </div>
  ) : (
    <div className={`inline-block relative w-[4.375rem] ${
      dir === 'ltr' ? 'mr-full' : 'ml-full'
    } group-2:w-[7.5rem] group-3:w-[14.375rem] ${
      dir === 'ltr' ? 'group-3:mr-double' : 'group-3:ml-double'
    }`}>
      <ImagePlaceholder ratio={56.25}>
        <img alt={alt} className="w-full" {...selectImgProps(props)} />
      </ImagePlaceholder>
      <PlayWrapper aria-hidden="true">
        {mediaIcons.video}
        {duration && <DurationWrapper>{duration}</DurationWrapper>}
      </PlayWrapper>
    </div>
  );
};

export default withEpisodeContext(EpisodeImage);
