import { use } from 'react';
import TimestampContainer from '#psammead/psammead-timestamp-container/src';
import { CurrentLiveProgramme } from '#app/models/types/radioSchedule';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.module.scss';

export const LISTEN_LIVE_SERVICES = ['pashto', 'swahili', 'arabic'];

interface ListenLiveCTAProps {
  programme?: CurrentLiveProgramme | null;
}

const hasRequiredFields = (programme: CurrentLiveProgramme) =>
  Boolean(
    programme.brandTitle &&
    programme.link &&
    programme.startTime &&
    programme.endTime,
  );

const parseTime = (value: string) => {
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? null : ms;
};

const ListenLiveCTA = ({ programme }: ListenLiveCTAProps) => {
  const {
    dir,
    service,
    locale,
    timezone,
    translations: {
      media: { listenLive },
    },
  } = use(ServiceContext);

  // if (!programme || !listenLive) return null;
  // if (programme.state !== 'live') return null;
  // if (!LISTEN_LIVE_SERVICES.includes(service)) return null;
  // if (!hasRequiredFields(programme)) return null;

  const { brandTitle, startTime, endTime, link } = programme;

  const startTimeMs = parseTime(startTime);
  const endTimeMs = parseTime(endTime);

  // if (startTimeMs === null || endTimeMs === null) return null;
  // if (endTimeMs <= Date.now()) return null;

  return (
    <div
      className={styles.wrapper}
      dir={dir}
      role="region"
      aria-label={listenLive}
      data-testid="listen-live-cta"
    >
      <span className={styles.liveIndicator}>{listenLive}</span>
      <p className={styles.brandTitle}>{brandTitle}</p>
      <span className={styles.until}>
        Finishes at{' '}
        <TimestampContainer
          timestamp={endTime}
          dateTimeFormat="YYYY-MM-DD"
          format="HH:mm"
          isRelative={false}
          padding={false}
          timezone={timezone}
          locale={locale}
          altCalendar={null}
        />
      </span>
      <a className={styles.link} href={link}>
        {listenLive}
      </a>
    </div>
  );
};

export default ListenLiveCTA;
