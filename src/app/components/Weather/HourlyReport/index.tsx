/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/react';
import Text from '../../Text';
import styles from '../index.styles';
import { WeatherReport } from '../types';

interface HourlyReportProps {
  report: WeatherReport;
}

const HourlyReport: FC<HourlyReportProps> = ({ report }) => {
  const iconEntry = report ? report.weatherType : undefined;
  const iconSrc =
    typeof iconEntry !== 'undefined'
      ? `http://localhost:7080/images/weather/${iconEntry}.svg`
      : undefined;
  const formatTime = (timeslot: string): string => {
    const hour = parseInt(timeslot, 10);
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  return (
    <div css={styles.hourlyReport}>
      <Text css={styles.timeSlot}>{formatTime(report.timeslot)}</Text>

      {iconSrc && (
        <span css={styles.weatherIcon}>
          <img
            src={iconSrc}
            alt={report.weatherTypeText}
            aria-label={report.weatherTypeText}
            width={40}
            height={40}
          />
          <span
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
            }}
          >
            {report.weatherTypeText}
          </span>
        </span>
      )}

      <Text css={styles.temperature}>{report.temperatureC}°C</Text>

      <Text css={styles.precipitation}>
        <img
          src="http://localhost:7080/images/weather/rain-chance.svg"
          alt="Chance of rain"
          width={20}
          height={20}
        />
        <span>{report.precipitationProbabilityInPercent}%</span>
      </Text>

      <span css={styles.windInfoContainer}>
        <div>
          <img
            src={`http://localhost:7080/images/weather/wind-${report.windDirectionAbbreviation.toLowerCase()}.svg`}
            alt={report.windDirectionAbbreviation}
            aria-label={report.weatherTypeText}
            width={40}
            height={40}
          />
        </div>
        <Text css={styles.windInfo}>{report.windSpeedKph}</Text>
      </span>
    </div>
  );
};

export default HourlyReport;
