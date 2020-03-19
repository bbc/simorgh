import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import styled from 'styled-components';
import pathOr from 'ramda/src/pathOr';
import moment from 'moment';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import RadioSchedule from '@bbc/psammead-radio-schedule';
import SectionLabel from '@bbc/psammead-section-label';
import { Link } from '@bbc/psammead-story-promo';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import processRadioSchedule from '../utilities/processRadioSchedule';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const MarginWrapper = styled.div`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-bottom: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
`;

const RadioScheduleSection = styled.section.attrs(() => ({
  role: 'region',
  'aria-labelledby': 'Radio-Schedule',
}))`
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const RadioScheduleSectionLabel = styled(SectionLabel)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
  }
`;

const RadioFrequencyLink = styled(Link)`
  font-size: 14px;
  line-height: 18px;
`;

const CanonicalRadioSchedule = ({ endpoint }) => {
  const [schedule, setRadioSchedule] = useState();
  const { service, script, dir, timezone, locale, radioSchedule } = useContext(
    ServiceContext,
  );
  const { timeOnServer } = useContext(RequestContext);
  moment.locale('en-GB');
  const timeOnClient = parseInt(moment.utc().format('x'), 10);
  const header = pathOr(null, ['header'], radioSchedule);
  const frequenciesPageUrl = pathOr(
    null,
    ['frequenciesPageUrl'],
    radioSchedule,
  );
  const frequenciesPageLabel = pathOr(
    null,
    ['frequenciesPageLabel'],
    radioSchedule,
  );

  useEffect(() => {
    const handleResponse = async response => {
      const radioScheduleData = await response.json();

      const schedules = processRadioSchedule(
        radioScheduleData,
        service,
        timeOnServer || timeOnClient,
      );
      setRadioSchedule(schedules);
    };

    const fetchRadioScheduleData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    fetchRadioScheduleData(endpoint);
  }, [endpoint, service, script, timezone, locale]);

  if (!schedule) {
    return null;
  }

  return (
    <RadioScheduleSection>
      <RadioScheduleSectionLabel
        script={script}
        labelId="Radio-Schedule"
        service={service}
        dir={dir}
        bar={false}
      >
        {header}
      </RadioScheduleSectionLabel>
      <MarginWrapper>
        <RadioSchedule
          schedules={schedule}
          locale={locale}
          timezone={timezone}
          script={script}
          service={service}
          dir={dir}
        />
        {frequenciesPageUrl && (
          <RadioFrequencyLink href={frequenciesPageUrl}>
            {frequenciesPageLabel}
          </RadioFrequencyLink>
        )}
      </MarginWrapper>
    </RadioScheduleSection>
  );
};

CanonicalRadioSchedule.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalRadioSchedule;
