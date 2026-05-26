import { FC, HTMLAttributes, use } from 'react';

import { Theme } from '@emotion/react';

import { ServiceContext } from '../../contexts/ServiceContext';
import { FontVariant, GelFontSize } from '../../models/types/theming';
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
  const { externalLinkText } = use(ServiceContext);
  const { hostname } = new URL(to, 'https://www.bbc.com');
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
    ...htmlAttributes,
  };

  return (
    <a {...linkProps} href={to}>
      {text}
    </a>
  );
};

export default InlineLink;
