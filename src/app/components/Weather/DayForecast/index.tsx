/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/react';
import Text from '../../Text';
import HourlyReport from '../HourlyReport';
import styles from '../index.styles';
import { DayForecast as DayForecastType } from '../types';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

interface DayForecastProps {
  forecast: DayForecastType;
  expanded?: boolean;
  datetimeLocale?: string;
  onToggle: () => void;
}

const DayForecast: FC<DayForecastProps> = ({
  forecast,
  expanded,
  onToggle,
  datetimeLocale,
}) => {
  const summary = forecast.summary?.report;
  const reports = forecast.detailed?.reports || [];

  // Date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(datetimeLocale ?? 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  // Icon from summary
  const iconEntry = summary ? summary.weatherType : undefined;
  const iconSrc = iconEntry
    ? `${getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}/images/weather/${iconEntry}-light.svg`
    : undefined;

  //   // Icon from summary
  //   const windIconEntry = summary ? weatherIconMap[summary.weatherType] : undefined;
  //   const windIconSrc = windIconEntry ? windIconEntry.light?.src : undefined;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div css={styles.dayContainer}>
      <div
        css={styles.dayHeader}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-controls={`day-content-${summary?.localDate}`}
      >
        <div css={styles.headerGroup}>
          {iconSrc && (
            <span css={styles.weatherIcon}>
              <img
                src={iconSrc}
                alt={summary?.weatherTypeText}
                aria-label={summary?.weatherTypeText}
                width={32}
                height={32}
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
                {summary?.weatherTypeText}
              </span>
            </span>
          )}
          <Text as="span" css={styles.headerTemp}>
            {typeof summary?.maxTempC === 'number'
              ? `${summary.maxTempC}°C`
              : ''}
          </Text>
          <Text as="span" css={styles.headerDate}>
            {formatDate(summary?.localDate || '')}
          </Text>
        </div>
        <div css={styles.expandIcon} className={expanded ? 'expanded' : ''}>
          ▼
        </div>
      </div>

      {expanded && (
        <div css={styles.dayContent} id={`day-content-${summary?.localDate}`}>
          <div css={styles.daySummary}>{/* ...other summary fields... */}</div>
          <div css={styles.hourlyReports}>
            {reports.map((report) => (
              <HourlyReport
                key={`${report.localDate}-${report.timeslot}`}
                report={report}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayForecast;
