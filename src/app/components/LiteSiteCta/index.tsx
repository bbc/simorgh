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
import { defaultTranslations } from './liteSiteConfig';

type CtaLinkProps = {
  isRtl: boolean;
  href: string;
  text: string;
  fontVariant?: string;
  showChevron?: boolean;
  ignoreLiteExtension?: boolean;
  className?: string;
};

const CtaLink = ({
  isRtl,
  href,
  text,
  fontVariant = 'sansRegular',
  showChevron = false,
  ignoreLiteExtension = false,
  className,
}: CtaLinkProps) => {
  const chevron = isRtl ? (
    <LeftChevron css={styles.chevron} />
  ) : (
    <RightChevron css={styles.chevron} />
  );

  return (
    <a
      href={href}
      className={className}
      css={styles.link}
      {...(ignoreLiteExtension && { 'data-ignore-lite': true })}
    >
      <Text size="brevier" fontVariant={fontVariant} css={styles.linkText}>
        {text}
      </Text>
      {showChevron && chevron}
    </a>
  );
};

const LiteSiteCta = () => {
  const { dir, translations } = useContext(ServiceContext);
  const { canonicalLink } = useContext(RequestContext);
  const isRtl = dir === 'rtl';
  const { liteSite = defaultTranslations } = translations;
  const {
    onboardingMessage,
    toMainSite,
    informationPage,
    informationPageLink,
    dataSaving,
  } = liteSite;
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
          <Text size="brevier">{onboardingMessage}</Text>
        </Paragraph>
        <Paragraph>
          <CtaLink
            fontVariant="sansBold"
            isRtl={isRtl}
            href={canonicalLink}
            text={toMainSite}
            css={styles.topLinkSpacing}
            ignoreLiteExtension
            showChevron
          />
        </Paragraph>
        <Paragraph>
          <CtaLink
            isRtl={isRtl}
            href={informationPageLink}
            text={informationPage}
            css={styles.bottomLinkSpacing}
          />
        </Paragraph>
      </div>
    </section>
  );
};

export default LiteSiteCta;
