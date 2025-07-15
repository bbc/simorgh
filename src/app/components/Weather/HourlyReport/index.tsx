/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/react';
import Text from '../../Text';
import styles from '../index.styles';
import { WeatherReport } from '../types';
import { weatherIconMap } from '../icons';

interface HourlyReportProps {
  report: WeatherReport;
}

const HourlyReport: FC<HourlyReportProps> = ({ report }) => {
  const iconEntry = weatherIconMap[report.weatherType];
  const iconSrc = iconEntry ? iconEntry.dark.src : undefined;
  const formatTime = (timeslot: string): string => {
    const hour = parseInt(timeslot, 10);
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  // Dynamically import SVGs by weatherType
  // This assumes Webpack or Next.js static import
  // If you use require.context or similar, adapt accordingly
  let Icon = null;
  try {
    Icon = require(`./icons/${report.weatherType}.svg`).default;
  } catch {
    Icon = null;
  }

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
        {report.precipitationProbabilityInPercent}%
      </Text>

      <Text css={styles.windInfo}>
        {report.windSpeedKph} km/h {report.windDirectionAbbreviation}
      </Text>
    </div>
  );
};

export default HourlyReport;
