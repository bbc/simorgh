/** @jsx jsx */

import { FC, HTMLAttributes } from 'react';
import { jsx } from '@emotion/react';
import { Link as ClientSideLink } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import { articlePath } from '../../routes/utils/regex';

interface Props extends HTMLAttributes<HTMLElement> {
  allowCSR?: boolean;
  className?: string;
  fontVariant?: FontVariant;
  size?: GelFontSize;
  to: string;
}

const allowedCsrPaths = articlePath; // currently, we only allow client side routing to article pages

const parseLocation = (location: string) =>
  pathToRegexp(allowedCsrPaths, [], {
    start: false,
    end: false,
  }).exec(location);

const Link: FC<Props> = ({
  allowCSR = false,
  className,
  children,
  to = '',
  ...htmlAttributes
}: Props) => {
  const linkProps = {
    className,
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
        >
          {children}
        </ClientSideLink>
      );
    }
  }

  return (
    <a {...linkProps} href={to}>
      {children}
    </a>
  );
};

export default Link;
