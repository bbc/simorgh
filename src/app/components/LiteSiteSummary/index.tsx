import { use } from 'react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import styles from './index.styles';
import defaultTranslations from './defaultTranslations';
import CallToActionLink from '../CallToActionLink';

const LiteSiteSummary = () => {
  const { translations } = use(ServiceContext);
  const { canonicalLink } = use(RequestContext);
  const { liteSite = defaultTranslations } = translations;
  const {
    onboardingMessage,
    toMainSite,
    informationPage,
    informationPageLink,
    dataSaving,
  } = liteSite;
  const id = 'LiteSiteSummary';
  const clickTrackerHandler = useClickTrackerHandler({
    componentName: 'lite-site-summary',
  });

  return (
    <section
      role="region"
      data-e2e="lite-summary"
      aria-labelledby={id}
      css={styles.outerContainer}
    >
      <Text as="strong" id={id} hidden>
        {dataSaving}
      </Text>
      <div css={styles.container}>
        <Paragraph size="brevier" css={styles.message}>
          {onboardingMessage}
        </Paragraph>
        <Paragraph data-e2e="to-main-site">
          <CallToActionLink
            url={canonicalLink}
            data-ignore-lite
            {...clickTrackerHandler}
            css={
              informationPageLink
                ? styles.topLinkSpacing
                : styles.singleLinkSpacing
            }
            alignWithMargin
            size="brevier"
          >
            <CallToActionLink.Text>{toMainSite}</CallToActionLink.Text>
            <CallToActionLink.Chevron />
          </CallToActionLink>
        </Paragraph>
        {informationPageLink && (
          <Paragraph data-e2e="information-page">
            <CallToActionLink
              url={informationPageLink}
              css={styles.bottomLinkSpacing}
              alignWithMargin
              size="brevier"
              fontVariant="sansRegular"
            >
              <CallToActionLink.Text>{informationPage}</CallToActionLink.Text>
            </CallToActionLink>
          </Paragraph>
        )}
      </div>
    </section>
  );
};

export default LiteSiteSummary;
