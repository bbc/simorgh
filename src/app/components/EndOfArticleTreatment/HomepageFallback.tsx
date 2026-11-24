import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.module.scss';

const HomepageFallback = ({ id }: { id: string }) => {
  const { translations, service, dir } = use(ServiceContext);
  const copy = translations.endOfArticlePreview;
  const clickTracker = useClickTrackerHandler({
    componentName: 'end-of-article-homepage',
    itemTracker: { type: 'homepage', text: copy?.homepage },
  });

  if (!copy) return null;

  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackContent}>
        <Heading
          level={3}
          size="trafalgar"
          id={`${id}-heading`}
          className={styles.fallbackHeading}
        >
          {copy.heading}
        </Heading>
        <Paragraph size="pica" className={styles.fallbackIntroduction}>
          {copy.fallbackIntroduction}
        </Paragraph>
        <a
          href={`https://www.bbc.com/${service}`}
          className={styles.homepageLink}
          {...clickTracker}
        >
          <span>{copy.homepage}</span>
          <Chevron orientation={ChevronOrientation.FORWARD} dir={dir} />
        </a>
      </div>
    </div>
  );
};

export default HomepageFallback;
