/** @jsx jsx */
import { useContext } from 'react';
import { jsx, css } from '@emotion/react';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Image from '../Image';
import styles from './index.styles';
import { LeftChevron, RightChevron } from '../icons';
import { ServiceContext } from '../../contexts/ServiceContext';
import CallToActionLink from '../CallToActionLink';
import idSanitiser from '../../lib/utilities/idSanitiser';

interface MessageBannerProps {
  heading: string;
  description?: string;
  link?: string;
  linkText: string;
  image?: string;
}

const MessageBanner = ({
  heading,
  description,
  link,
  linkText,
  image,
}: MessageBannerProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  const id = `message-banner-${idSanitiser(heading)}`;

  return (
    <section
      css={styles.container}
      role="region"
      aria-labelledby={id}
      data-testid={id}
    >
      <div
        css={[
          styles.card,
          isRtl ? css({ paddingRight: '1rem' }) : css({ paddingLeft: '1rem' }),
        ]}
      >
        <div css={styles.textWrap}>
          <Heading level={2} size="paragon" css={styles.heading} id={id}>
            {heading}
          </Heading>
          <Paragraph size="longPrimer" css={styles.paragraph}>
            {description}
          </Paragraph>
        </div>
        <div css={styles.flex}>
          <CallToActionLink
            href={link}
            css={styles.callToActionLink}
            className="focusIndicatorInvert"
          >
            {linkText}
            {isRtl ? (
              <LeftChevron css={styles.chevron} />
            ) : (
              <RightChevron css={styles.chevron} />
            )}
          </CallToActionLink>
          {image && (
            <div css={isRtl ? styles.imageRtl : styles.imageLtr}>
              <Image
                alt=""
                src={image.replace('{width}', 'raw')}
                placeholder={false}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default MessageBanner;
