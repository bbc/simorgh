import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import styled from '@emotion/styled';
import moment from 'moment';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import SectionLabel from '@bbc/psammead-section-label';
import { C_LUNAR, C_EBON, C_METAL } from '@bbc/psammead-styles/colours';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import RadioSchedule from '#components/RadioSchedule';
import processRadioSchedule from '../utilities/processRadioSchedule';
import radioSchedulesShape from '../utilities/radioScheduleShape';
import webLogger from '#lib/logger.web';
import { RADIO_SCHEDULE_FETCH_ERROR } from '#lib/logger.const';

const logger = webLogger();

const RadioScheduleSection = styled.section`
  background-color: ${C_LUNAR};
  padding: 0 ${GEL_MARGIN_ABOVE_400PX};
`;

const RadioScheduleWrapper = styled.div`
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  padding-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

const RadioScheduleSectionLabel = styled(SectionLabel)`
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  padding-top: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    padding-top: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
    padding-top: ${GEL_SPACING_QUAD};
  }
`;

const RadioFrequencyLink = styled.a`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => service && getSansRegular(service)}
  color: ${C_EBON};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_METAL};
  }
`;

const CanonicalRadioSchedule = ({ initialData, endpoint, lang, className }) => {
  const {
    service,
    script,
    dir,
    radioSchedule: radioScheduleConfig = {},
  } = useContext(ServiceContext);

  const { timeOnServer } = useContext(RequestContext);

  const [radioSchedule, setRadioSchedule] = useState(initialData);

  const { header, frequenciesPageUrl, frequenciesPageLabel, durationLabel } =
    radioScheduleConfig;

  useEffect(() => {
    if (!radioSchedule) {
      const handleResponse = url => async response => {
        if (!response.ok) {
          throw Error(
            `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
          );
        }

        const radioScheduleData = await response.json();
        const timeOnClient = parseInt(moment.utc().format('x'), 10);
        const processedSchedule = processRadioSchedule(
          radioScheduleData,
          service,
          timeOnServer || timeOnClient,
        );
        setRadioSchedule(processedSchedule);
      };

      const fetchRadioScheduleData = pathname =>
        fetch(pathname, { mode: 'no-cors' })
          .then(handleResponse(pathname))
          .catch(error => {
            logger.error(
              JSON.stringify(
                {
                  event: RADIO_SCHEDULE_FETCH_ERROR,
                  message: error.toString(),
                },
                null,
                2,
              ),
            );
          });

      fetchRadioScheduleData(endpoint);
    }
  }, [endpoint, service, timeOnServer, radioSchedule]);

  if (!radioSchedule) {
    return null;
  }

  return (
    <RadioScheduleSection
      className={className}
      role="region"
      aria-labelledby="Radio-Schedule"
      {...(lang && { lang })}
    >
      <RadioScheduleSectionLabel
        script={script}
        labelId="Radio-Schedule"
        service={service}
        dir={dir}
        bar={false}
        backgroundColor={C_LUNAR}
      >
        {header}
      </RadioScheduleSectionLabel>
      <RadioScheduleWrapper data-e2e="radio-schedule">
        <RadioSchedule schedule={radioSchedule} durationLabel={durationLabel} />
        {frequenciesPageUrl && (
          <RadioFrequencyLink
            href={frequenciesPageUrl}
            script={script}
            service={service}
          >
            {frequenciesPageLabel}
          </RadioFrequencyLink>
        )}
      </RadioScheduleWrapper>
    </RadioScheduleSection>
  );
};

CanonicalRadioSchedule.propTypes = {
  endpoint: string.isRequired,
  initialData: radioSchedulesShape,
  lang: string,
  className: string,
};

CanonicalRadioSchedule.defaultProps = {
  initialData: undefined,
  lang: null,
  className: '',
};

export default CanonicalRadioSchedule;
