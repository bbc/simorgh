/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { LeftChevron, RightChevron } from '../icons';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import styles from './index.styles';

type CtaLinkProps = {
  isRtl: boolean;
  href: string;
  text: string;
  fontVariant?: string;
  className?: string;
};

const CtaLink = ({
  isRtl,
  href,
  text,
  fontVariant = 'sansRegular',
  className,
}: CtaLinkProps) => {
  return (
    <a href={href} className={className} css={styles.link}>
      <Text size="brevier" fontVariant={fontVariant} css={styles.linkText}>
        {text}
      </Text>
      {isRtl ? (
        <LeftChevron css={styles.chevron} />
      ) : (
        <RightChevron css={styles.chevron} />
      )}
    </a>
  );
};

const defaultTranslations = {
  disclaimer: `You’re viewing a text-only version of this website that uses less data. View the main version of the website including all images and videos.`,
  backToCanonical: 'Take me to the main website',
  findOutMore: 'Find out more about this data-saving version',
  dataSaving: 'Data saving version',
};

const LiteSiteCta = () => {
  const { dir, translations } = useContext(ServiceContext);
  const { canonicalLink } = useContext(RequestContext);
  const isRtl = dir === 'rtl';
  const { liteSite = defaultTranslations } = translations;
  const { disclaimer, backToCanonical, findOutMore, dataSaving } = liteSite;
  const id = 'LiteSiteCta';

  return (
    <section
      role="region"
      data-e2e="lite-cta"
      aria-labelledby={id}
      css={styles.outerContainer}
    >
      <VisuallyHiddenText as="strong" id={id} aria-hidden>
        {dataSaving}
      </VisuallyHiddenText>
      <div css={styles.container}>
        <Paragraph>
          <Text size="brevier">{disclaimer}</Text>
        </Paragraph>
        <Paragraph>
          <CtaLink
            fontVariant="sansBold"
            isRtl={isRtl}
            href={canonicalLink}
            text={backToCanonical}
            css={styles.topLinkSpacing}
          />
        </Paragraph>
        <Paragraph>
          <CtaLink
            isRtl={isRtl}
            href={canonicalLink}
            text={findOutMore}
            css={styles.bottomLinkSpacing}
          />
        </Paragraph>
      </div>
    </section>
  );
};

export default LiteSiteCta;
