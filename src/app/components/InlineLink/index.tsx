/** @jsx jsx */

import { useContext, FC, HTMLAttributes } from 'react';
import { jsx, Theme } from '@emotion/react';
import Url from 'url-parse';
import { Link as ClientSideLink } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import { ServiceContext } from '../../contexts/ServiceContext';
import { articlePath } from '../../routes/utils/regex';
import styles from './index.styles';

interface Props extends HTMLAttributes<HTMLElement> {
  allowCSR?: boolean;
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

const allowedCsrPaths = articlePath; // currently, we only allow client side routing to article pages

const parseLocation = (location: string) =>
  pathToRegexp(allowedCsrPaths, [], {
    start: false,
    end: false,
  }).exec(location);

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

  if (allowCSR) {
    const parsedLocation = parseLocation(to);
    const isCsr = parsedLocation?.length;

    if (isCsr) {
      const [pathname] = parsedLocation;
      const [, hash] = to.split('#');

      return (
        <ClientSideLink
          {...linkProps}
          to={{
            pathname,
            hash,
          }}
          data-testid="client-side-link"
        >
          {text}
        </ClientSideLink>
      );
    }
  }

  return (
    <a {...linkProps} href={to}>
      {text}
    </a>
  );
};

export default InlineLink;
