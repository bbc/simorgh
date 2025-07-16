import React, { use } from 'react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
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
      className="
        mx-4 
        group-2:mx-8 
        bg-white 
        border-b 
        border-solid 
        border-gel-grey-3
      "
    >
      <Text as="strong" id={id} hidden>
        {dataSaving}
      </Text>
      <div className="
        py-8 
        group-1:pt-12 
        group-1:pb-4 
        max-w-[63.4rem] 
        relative 
        group-4:mx-auto
      ">
        <Paragraph 
          size="brevier" 
          className="
            mb-2 
            group-1:mb-4
          "
        >
          {onboardingMessage}
        </Paragraph>
        <Paragraph data-e2e="to-main-site">
          <CallToActionLink
            url={canonicalLink}
            data-ignore-lite
            {...clickTrackerHandler}
            className={
              informationPageLink
                ? 'py-6' // topLinkSpacing
                : 'py-6 mb-6 group-1:mb-2' // singleLinkSpacing
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
              className="
                py-2 
                pb-8 
                group-1:py-4 
                group-1:pb-8
              "
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
