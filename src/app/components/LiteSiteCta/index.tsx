/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { useATIClickTrackerHandler } from '#app/hooks/useClickTrackerHandler';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import styles from './index.styles';
import { defaultTranslations } from './liteSiteConfig';
import CallToActionLink from '../CallToActionLinkComponent';

const LiteSiteCta = () => {
  const { translations } = useContext(ServiceContext);
  const { canonicalLink } = useContext(RequestContext);
  const { liteSite = defaultTranslations } = translations;
  const {
    onboardingMessage,
    toMainSite,
    informationPage,
    informationPageLink,
    dataSaving,
  } = liteSite;
  const id = 'LiteSiteCta';
  const atiClickTrackerHandler = useATIClickTrackerHandler({
    componentName: 'lite-site-cta',
  });

  return (
    <section
      role="region"
      data-e2e="lite-cta"
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
            {...{ 'data-ignore-lite': true }}
            {...atiClickTrackerHandler}
            css={styles.topLinkSpacing}
            alignWithMargin
          >
            <CallToActionLink.Text size="brevier">
              {toMainSite}
            </CallToActionLink.Text>
            <CallToActionLink.Chevron size="brevier" />
          </CallToActionLink>
        </Paragraph>
        <Paragraph data-e2e="information-page">
          <CallToActionLink
            url={informationPageLink}
            css={styles.bottomLinkSpacing}
            alignWithMargin
          >
            <CallToActionLink.Text size="brevier" fontVariant="sansRegular">
              {informationPage}
            </CallToActionLink.Text>
          </CallToActionLink>
        </Paragraph>
      </div>
    </section>
  );
};

export default LiteSiteCta;
