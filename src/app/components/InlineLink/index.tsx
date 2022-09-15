/** @jsx jsx */

import { useContext, FC, HTMLAttributes } from 'react';
import { jsx, Theme } from '@emotion/react';
import Url from 'url-parse';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import { ServiceContext } from '../../contexts/ServiceContext';
import Link from '../Link';
import styles from './index.styles';

interface Props extends HTMLAttributes<HTMLElement> {
  allowCSR?: boolean;
  className?: string;
  fontVariant?: FontVariant;
  size?: GelFontSize;
  to: string;
  text: string;
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
  allowCSR = false,
  className,
  fontVariant,
  size,
  text,
  to,
  ...htmlAttributes
}: Props) => {
  const { externalLinkText } = useContext(ServiceContext);
  const { hostname } = new Url(to);
  const isExternalLink = !bbcDomains.some(bbcDomain => hostname === bbcDomain);

  return (
    <Link
      allowCSR={allowCSR}
      className={className}
      css={({ fontSizes, fontVariants }: Theme) => [
        styles.self,
        size && fontSizes[size],
        fontVariant && fontVariants[fontVariant],
      ]}
      aria-label={isExternalLink ? text.concat(externalLinkText) : undefined}
      to={to}
      {...htmlAttributes}
    >
      {text}
    </Link>
  );
};

export default InlineLink;
