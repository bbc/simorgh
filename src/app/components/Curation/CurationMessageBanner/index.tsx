import Heading from '#app/components/Heading';
import MessageBanner from '#app/components/MessageBanner';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import styles from './index.styles';

type Props = {
  id: string;
  heading: string;
  description?: string;
  link: string;
  linkText: string;
  image?: string;
  eventTrackingData?: EventTrackingData;
};

const CurationMessageBanner = ({
  heading,
  description,
  link,
  linkText,
  image,
  id,
  eventTrackingData,
}: Props) => {
  return (
    <section
      css={styles.container}
      role="region"
      aria-labelledby={id}
      data-testid={id}
    >
      <MessageBanner
        description={description}
        link={link}
        linkText={linkText}
        image={image}
        eventTrackingData={eventTrackingData}
      >
        <Heading level={2} size="paragon" css={styles.heading} id={id}>
          {heading}
        </Heading>
      </MessageBanner>
    </section>
  );
};

export default CurationMessageBanner;
