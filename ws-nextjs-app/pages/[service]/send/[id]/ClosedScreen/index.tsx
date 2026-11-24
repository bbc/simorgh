import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TimeStampContainer from '#app/components/TimestampContainer';
import GenericMessage from '../GenericMessage';
import styles from './index.module.scss';
import fallbackTranslations from '../fallbackTranslations';

type Props = {
  title: string;
  closingTime?: string;
};

export default function ClosedScreen({ title, closingTime }: Props) {
  const {
    timezone,
    locale,
    altCalendar,
    translations: {
      ugc: { closedDescription = fallbackTranslations.closedDescription } = {},
    },
  } = use(ServiceContext);

  const dateDescription = closedDescription?.split('{{date}}');

  return (
    <GenericMessage heading={title}>
      {closingTime && (
        <>
          {`${dateDescription?.[0]}`}
          <TimeStampContainer
            className={styles.timestamp}
            timestamp={closingTime}
            dateTimeFormat="DD MMMM YYYY"
            format="D MMMM YYYY"
            locale={locale}
            timezone={timezone}
            altCalendar={altCalendar}
            padding={false}
          />
          {`${dateDescription?.[1]}`}
        </>
      )}
    </GenericMessage>
  );
}
