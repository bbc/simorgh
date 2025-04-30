/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Heading from '../Heading';
import Image from '../Image';
import InlineLink from '../InlineLink';
import styles from './index.styles';

interface SocialLinksProps {
  position: number;
  title: string;
  summaries: Summary[];
}

/**
 * TODO:
 * 2. Handle media queries
 * 3. Render correct image sizes
 * 3. Link style
 * 4. RTL feature
 * 5. Single item
 * 6. Odd number of items;
 */
const SocialLinks = ({ summaries, position, title }: SocialLinksProps) => {
  console.group('📦 SocialLinks ');
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  console.log({ isRtl });
  console.log({ summaries });

  console.groupEnd();

  return (
    <section
      role="region"
      aria-labelledby={`useful-links-${position}`}
      css={styles.container}
    >
      <Heading level={2} id={`useful-links-${position}`} css={styles.heading}>
        {title}
      </Heading>
      <ul css={styles.unorderedList}>
        {summaries.map(summary => {
          return (
            <li css={styles.item}>
              <Image
                css={styles.image}
                alt=""
                src={summary.imageUrl.replace('{width}', 'raw')}
                placeholder={false}
              />

              <InlineLink
                to={summary.link}
                text={summary.title}
                fontVariant="sansBold"
                css={styles.link}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default SocialLinks;
