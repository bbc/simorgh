import React, { use, FC, HTMLAttributes } from 'react';
import Url from 'url-parse';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import { ServiceContext } from '../../contexts/ServiceContext';

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string;
  fontVariant?: FontVariant;
  size?: GelFontSize;
  text: string;
  to: string;
}

const bbcDomains = [
  'localhost',
  'www.bbc.com',
  'bbc.com',
  'www.bbc.co.uk',
  'bbc.co.uk',
  'www.bbcrussian.com',
  'bbcrussian.com',
];

const InlineLink: FC<Props> = ({
  className = 'focusIndicatorReducedWidth',
  fontVariant,
  size,
  text,
  to,
  ...htmlAttributes
}: Props) => {
  const { externalLinkText } = use(ServiceContext);
  const { hostname } = new Url(to);
  const isExternalLink =
    hostname && !bbcDomains.some(bbcDomain => hostname === bbcDomain);
  
  const getFontVariantClass = (variant?: FontVariant) => {
    if (!variant) return '';
    return `font-gel-${variant.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  };
  
  const getFontSizeClass = (fontSize?: GelFontSize) => {
    if (!fontSize) return '';
    return `text-gel-${fontSize.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  };
  
  const linkProps = {
    ...(isExternalLink &&
      typeof text === 'string' && {
        'aria-label': text.concat(externalLinkText),
      }),
    className: `
      text-gel-ebon 
      border-b 
      border-solid 
      border-gel-postbox 
      no-underline
      visited:text-gel-metal 
      visited:border-gel-metal
      hover:border-b-2 
      hover:border-gel-postbox 
      hover:text-gel-postbox
      focus:border-b-2 
      focus:border-gel-postbox 
      focus:text-gel-postbox
      ${getFontVariantClass(fontVariant)}
      ${getFontSizeClass(size)}
      ${className}
    `,
    ...htmlAttributes,
  };

  return (
    <a {...linkProps} href={to}>
      {text}
    </a>
  );
};

export default InlineLink;
