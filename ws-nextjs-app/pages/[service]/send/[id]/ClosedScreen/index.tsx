/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, useEffect } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import GenericMessage from '../GenericMessage';
import styles from './styles';
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
    service,
    script,
    translations: {
      ugc: {
        closedHeading = fallbackTranslations.closedHeading,
        closedDescription = fallbackTranslations.closedDescription,
      } = {},
    },
  } = useContext(ServiceContext);

  useEffect(() => {
    document.title = `${closedHeading}: ${title}`;
  }, [closedHeading, title]);

  const dateDescription = closedDescription?.split('{{date}}');

  return (
    <GenericMessage heading={closedHeading}>
      {closingTime && (
        <>
          {`${dateDescription?.[0]}`}
          <TimeStampContainer
            css={styles.timestamp}
            timestamp={closingTime}
            dateTimeFormat="DD MMMM YYYY"
            format="D MMMM YYYY"
            locale={locale}
            timezone={timezone}
            service={service}
            script={script}
            altCalendar={altCalendar}
            padding={false}
          />
          {`${dateDescription?.[1]}`}
        </>
      )}
    </GenericMessage>
  );
}
