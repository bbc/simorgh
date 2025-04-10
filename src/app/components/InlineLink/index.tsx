/** @jsx jsx */

import { useContext, FC, HTMLAttributes } from 'react';
import { jsx, Theme } from '@emotion/react';
import Url from 'url-parse';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import { ServiceContext } from '../../contexts/ServiceContext';
import { styles } from './index.styles';

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
  const clickTrackerHandler = useClickTrackerHandler({
    componentName: 'InlineLink',
    advertiserID: to
  });
  const { externalLinkText } = useContext(ServiceContext);
  const { hostname } = new Url(to);
  const isExternalLink =
    hostname && !bbcDomains.some(bbcDomain => hostname === bbcDomain);
  const linkProps = {
    ...(isExternalLink &&
      typeof text === 'string' && {
        'aria-label': text.concat(externalLinkText),
      }),
    className,
    css: ({ fontSizes, fontVariants }: Theme) => [
      styles.self,
      size && fontSizes[size],
      fontVariant && fontVariants[fontVariant],
    ],
    onClick: clickTrackerHandler,
    ...htmlAttributes,
  };
  const href = linkProps.locator ? linkProps.locator : to;

  return (
    <a {...linkProps} href={href}>
      {text}
    </a>
  );
};

export default InlineLink;
