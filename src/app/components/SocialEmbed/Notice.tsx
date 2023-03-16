import React, { memo } from 'react';
import styled from '@emotion/styled';

import { SocialEmbedProviders } from '#app/models/types/global';
import { detokenise, dictionaryFactory } from './utilities';

const BORDER_WEIGHT = '0.0625rem';

const Wrapper = styled.div`
  ${({ theme }) => theme.fontVariants.sansRegular}
  ${({ theme }) => theme.fontSizes.bodyCopy}
  border: ${BORDER_WEIGHT} solid ${({ theme }) => theme.palette.PEBBLE};
  border-radius: ${({ theme }) => `${theme.spacings.FULL}rem`};
  color: ${({ theme }) => theme.palette.SHADOW};
  padding: ${({ theme }) => `${theme.spacings.DOUBLE}rem`};

  p {
    margin-top: 0;
    margin-bottom: ${({ theme }) => `${theme.spacings.FULL}rem`};
  }

  a,
  small {
    display: block;
  }

  a {
    ${({ theme }) => theme.fontVariants.sansBold}

    color: ${({ theme }) => theme.palette.EBON};
    text-decoration: none;

    &:visited {
      color: ${({ theme }) => theme.palette.METAL};
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  small {
    margin-top: ${({ theme }) => `${theme.spacings.FULL}rem`};
    ${({ theme }) => theme.fontSizes.minion}
  }
`;

type Props = {
  provider: SocialEmbedProviders;
  text: string;
  linkText: string;
  linkTextSuffixVisuallyHidden: string;
  linkHref: string;
  warningText: string;
};

const Notice = ({
  provider,
  text,
  linkText,
  linkTextSuffixVisuallyHidden,
  linkHref,
  warningText,
}: Props) => {
  const dictionary = dictionaryFactory({ provider });
  const [detokenisedLinkText, detokenisedLinkTextSuffix] = [
    detokenise(linkText, dictionary),
    detokenise(linkTextSuffixVisuallyHidden, dictionary),
  ];

  return (
    <Wrapper>
      <p data-testid="social-embed-fallback-title">
        {detokenise(text, dictionary)}
      </p>
      <a
        href={linkHref}
        {...(detokenisedLinkTextSuffix && {
          'aria-label': `${detokenisedLinkText}${detokenisedLinkTextSuffix}`,
        })}
      >
        {detokenisedLinkText}
      </a>
      {warningText && <small>{warningText}</small>}
    </Wrapper>
  );
};

export default memo(Notice);
