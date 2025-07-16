import React, { use } from 'react';
import SectionLabel from '#psammead/psammead-section-label/src';
import { GridWrapper, GridItemLarge } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import SkipLinkWrapper from '../../components/SkipLinkWrapper';
import { GHOST } from '../../../components/ThemeProvider/palette';

const OptionallyRenderedSkipWrapper = ({
  skipLink = null,
  service,
  children,
}) =>
  skipLink ? (
    <SkipLinkWrapper service={service} {...skipLink}>
      {children}
    </SkipLinkWrapper>
  ) : (
    children
  );

const CpsOnwardJourneyWrapper = ({
  children,
  parentColumns,
  labelId,
  a11yAttributes,
  className,
  dir,
}) =>
  parentColumns ? (
    <div
      data-e2e={labelId}
      {...a11yAttributes}
      className={`group-1:px-full group-2:px-double group-3:px-double ${className}`}
    >
      {children}
    </div>
  ) : (
    <GridWrapper data-e2e={labelId} {...a11yAttributes}>
      <GridItemLarge
        dir={dir}
        className="mb-double group-3:mb-triple group-3:pb-6 group-3:mb-8 max-group-3:pb-8 max-group-3:mb-4"
      >
        {children}
      </GridItemLarge>
    </GridWrapper>
  );

const StyledSectionLabel = ({ columnType, ...props }) => (
  <SectionLabel
    {...props}
    className={`mt-0 group-3:mt-0 ${
      columnType === 'main' ? 'm-0 group-3:py-double' : ''
    }`}
  />
);

const SingleContentWrapper = ({ columnType, children }) => (
  <div
    className={
      columnType === 'secondary'
        ? 'group-3:pt-double group-4:pb-triple'
        : ''
    }
  >
    {children}
  </div>
);

const CpsOnwardJourney = ({
  className = '',
  LabelComponent = StyledSectionLabel,
  labelId,
  title = '',
  content = [],
  isMediaContent = false,
  parentColumns = null,
  promoListComponent: PromoListComponent,
  promoComponent: PromoComponent,
  sectionLabelOverrideAs = null,
  sectionLabelBar = true,
  sectionLabelBackground = GHOST,
  columnType,
  skipLink = null,
  eventTrackingData = null,
  sendOptimizelyEvents = false,
}) => {
  const { script, service, dir } = use(ServiceContext);

  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': labelId,
  };

  if (!content.length) return null;
  const hasSingleContent = content.length === 1;
  const [singleContent] = content;

  return (
    <CpsOnwardJourneyWrapper
      parentColumns={parentColumns}
      labelId={labelId}
      a11yAttributes={a11yAttributes}
      className={className}
      dir={dir}
    >
      <OptionallyRenderedSkipWrapper skipLink={skipLink} service={service}>
        {title ? (
          <LabelComponent
            script={script}
            service={service}
            dir={dir}
            labelId={labelId}
            columnType={columnType}
            overrideHeadingAs={sectionLabelOverrideAs}
            bar={sectionLabelBar}
            backgroundColor={sectionLabelBackground}
          >
            {title}
          </LabelComponent>
        ) : null}
        {hasSingleContent ? (
          <SingleContentWrapper columnType={columnType}>
            <PromoComponent
              promo={singleContent}
              dir={dir}
              eventTrackingData={eventTrackingData}
              sendOptimizelyEvents={sendOptimizelyEvents}
            />
          </SingleContentWrapper>
        ) : (
          <PromoListComponent
            promoItems={content}
            dir={dir}
            isMediaContent={isMediaContent}
            eventTrackingData={eventTrackingData}
            sendOptimizelyEvents={sendOptimizelyEvents}
          />
        )}
      </OptionallyRenderedSkipWrapper>
    </CpsOnwardJourneyWrapper>
  );
};

export default CpsOnwardJourney;
