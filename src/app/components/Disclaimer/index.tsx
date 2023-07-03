/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, PropsWithChildren } from 'react';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '#contexts/ServiceContext';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import Paragraph from '../Paragraph';
import InlineLink from '../InlineLink';
import styles from './index.styles';

type Props = {
  increasePaddingOnDesktop?: boolean;
};

const DisclaimerComponent = ({
  increasePaddingOnDesktop = true,
}: PropsWithChildren<Props>) => {
  const { disclaimer, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = enabled && disclaimer && !isEmpty(disclaimer);

  if (!shouldShow) return null;

  const infoBannerLabelTranslation = pathOr(
    'Information',
    ['infoBannerLabel'],
    translations,
  );

  return (
    <section
      css={[
        styles.infoBanner,
        increasePaddingOnDesktop && styles.increasePaddingOnDesktop,
      ]}
      role="region"
      aria-label={infoBannerLabelTranslation}
    >
      <Paragraph css={styles.inner} size="longPrimer" fontVariant="sansLight">
        {disclaimer &&
          Object.values(disclaimer).map((para, index) => {
            const linkText: string = path(['text'], para);
            const linkUrl: string = path(['url'], para);
            const paraAsString: string = para;
            return linkUrl ? (
              <InlineLink
                id={`infoBannerLink-${index}`}
                text={linkText}
                to={linkUrl}
              />
            ) : (
              paraAsString
            );
          })}
      </Paragraph>
    </section>
  );
};

export default DisclaimerComponent;
