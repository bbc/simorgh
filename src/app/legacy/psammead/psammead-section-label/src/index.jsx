import React from 'react';
import { GHOST } from '#app/components/ThemeProvider/palette';
import { PlainTitle, LinkTitle } from './titles';

const SectionLabelWrapper = ({ visuallyHidden, children, ...props }) => {
  const hiddenClasses = visuallyHidden 
    ? 'sr-only' 
    : 'relative z-0 text-gray-900 mt-quad group-3:mt-triple group-4:mb-triple';
  
  return (
    <div className={hiddenClasses} {...props}>
      {children}
    </div>
  );
};

export const Heading = ({ children, ...props }) => (
  <h2 
    className="m-0 p-0 scroll-mt-double focus-visible:outline-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:shadow-focus-ring"
    {...props}
  >
    {children}
  </h2>
);

const SectionLabel = ({
  children: title,
  dir = 'ltr',
  href = '',
  labelId,
  linkText = '',
  script,
  service,
  visuallyHidden = false,
  backgroundColor = GHOST,
  overrideHeadingAs = '',
  ...props
}) => (
  <SectionLabelWrapper visuallyHidden={visuallyHidden} {...props}>
    <Heading
      as={overrideHeadingAs}
      {...(labelId &&
        !overrideHeadingAs && {
          id: `section-label-heading-${labelId}`,
          tabIndex: -1,
        })}
    >
      {linkText && href ? (
        <LinkTitle
          dir={dir}
          href={href}
          labelId={labelId}
          linkText={linkText}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
        >
          {title}
        </LinkTitle>
      ) : (
        <PlainTitle
          dir={dir}
          labelId={labelId}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
        >
          {title}
        </PlainTitle>
      )}
    </Heading>
  </SectionLabelWrapper>
);

export default SectionLabel;
