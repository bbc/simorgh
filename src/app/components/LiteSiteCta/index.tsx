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
  className?: string;
};

const CtaLink = ({ isRtl, href, text, className }: CtaLinkProps) => {
  return (
    <Text as="a" size="brevier" href={href} className={className}>
      {text}
      {isRtl ? <LeftChevron /> : <RightChevron />}
    </Text>
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
  // TO DO - this is still taking to lite.
  const { canonicalLink } = useContext(RequestContext);
  const isRtl = dir === 'rtl';
  // TO DO - Add real translations
  const { liteSite = defaultTranslations } = translations;
  const { disclaimer, backToCanonical, findOutMore, dataSaving } = liteSite;
  const id = 'LiteSiteCta';

  return (
    <section role="region" aria-labelledby={id} css={styles.container}>
      <VisuallyHiddenText as="strong" id={id} aria-hidden>
        {dataSaving}
      </VisuallyHiddenText>
      <Paragraph>
        <Text size="brevier">{disclaimer}</Text>
      </Paragraph>
      <Paragraph css={styles.linkContainer}>
        <CtaLink
          css={[styles.link, styles.canonicalLink]}
          isRtl={isRtl}
          href={canonicalLink}
          text={backToCanonical}
        />
      </Paragraph>
      <Paragraph>
        <CtaLink
          css={styles.link}
          isRtl={isRtl}
          href={canonicalLink}
          text={findOutMore}
        />
      </Paragraph>
    </section>
  );
};

export default LiteSiteCta;
