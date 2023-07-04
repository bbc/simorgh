/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, PropsWithChildren } from 'react';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemLarge } from '#components/Grid';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import Paragraph from '../Paragraph';
import InlineLink from '../InlineLink';
import styles from './index.styles';

type Props = {
  increasePaddingOnDesktop?: boolean;
};

type Disclaimer =
  | string
  | {
      text: string;
      url: string;
      isExternal: boolean;
    };

const DisclaimerComponent = ({
  increasePaddingOnDesktop,
}: PropsWithChildren<Props>) => {
  const { disclaimer, translations } = useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = enabled && disclaimer && !isEmpty(disclaimer);

  if (!shouldShow) return null;

  const infoBannerLabelTranslation = pathOr(
    'Information',
    ['infoBannerLabel'],
    translations,
  );

  return (
    <GridItemLarge>
      <section
        css={[
          styles.infoBanner,
          increasePaddingOnDesktop && styles.increasePaddingOnDesktop,
        ]}
        role="region"
        aria-label={infoBannerLabelTranslation}
      >
        <Paragraph
          css={[
            styles.inner,
            pageType === ARTICLE_PAGE && styles.increaseTopMargin,
          ]}
          size="longPrimer"
          fontVariant="sansLight"
        >
          {disclaimer &&
            Object.values(disclaimer).map(para => {
              const linkText: string | undefined = path(['text'], para);
              const linkUrl: string | undefined = path(['url'], para);
              const paraAsString: Disclaimer = para;
              return linkUrl ? (
                <InlineLink
                  css={styles.inlineLink}
                  key={linkText as string}
                  text={linkText as string}
                  to={linkUrl as string}
                />
              ) : (
                (paraAsString as string)
              );
            })}
        </Paragraph>
      </section>
    </GridItemLarge>
  );
};

export default DisclaimerComponent;
