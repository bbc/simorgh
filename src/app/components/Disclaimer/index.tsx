/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, PropsWithChildren } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import { GridItemLarge } from '#legacy/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import useToggle from '../../hooks/useToggle';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';
import Text from '../Text';
import InlineLink from '../InlineLink';
import styles from './index.styles';

type Props = {
  increasePaddingOnDesktop?: boolean;
};

interface Disclaimer {
  text: string;
  url: string;
  isExternal: boolean;
}

const DisclaimerComponent = ({
  increasePaddingOnDesktop,
}: PropsWithChildren<Props>) => {
  const { disclaimer, translations } = useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = enabled && disclaimer && !isEmpty(disclaimer);

  if (!shouldShow) return null;

  const infoBannerLabelTranslation =
    translations?.infoBannerLabel || 'Information';

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
        <Text
          css={[
            styles.inner,
            pageType === ARTICLE_PAGE && styles.increaseTopMargin,
          ]}
          size="longPrimer"
          fontVariant="sansRegular"
          as="strong"
        >
          {disclaimer &&
            Object.values(disclaimer).map(para => {
              const linkText: string = (para as Disclaimer).text;
              const linkUrl: string = (para as Disclaimer).url;
              return linkUrl ? (
                <InlineLink
                  className="focusIndicatorReducedWidth"
                  css={styles.inlineLink}
                  key={linkText}
                  text={linkText}
                  to={linkUrl}
                />
              ) : (
                (para as string)
              );
            })}
        </Text>
      </section>
    </GridItemLarge>
  );
};

export default DisclaimerComponent;
