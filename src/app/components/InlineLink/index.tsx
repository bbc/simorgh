import { use, FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import { ServiceContext } from '../../contexts/ServiceContext';
import { getTypographyCustomProperties } from '../ThemeProviderSCSSModules/typography';
import styles from './index.module.scss';

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
  className,
  fontVariant,
  size,
  text,
  to,
  style,
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
    className: clsx(styles.self, 'focusIndicatorReducedWidth', className),
    style: {
      ...getTypographyCustomProperties({ size, fontVariant }),
      ...style,
    },
    ...htmlAttributes,
  };

  return (
    <a {...linkProps} href={to}>
      {text}
    </a>
  );
};

export default InlineLink;
