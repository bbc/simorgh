import styles from './index.styles';

const Footer = ({ venue, attendanceValue, attendanceInfo }) => {
  const formattedAttendanceValue = attendanceValue?.toLocaleString();

  return (
    <div css={styles.footer()}>
      <hr css={styles.horizontalRule()} aria-hidden />
      <div css={styles.footerTextWrapper()}>
        <div css={styles.venue()}>
          <span css={styles.venueLabel()}>Venue:</span>
          {attendanceInfo ? `${venue} (${attendanceInfo})` : venue}
        </div>
      </div>
      <div css={styles.footerTextWrapper()}>
        {attendanceValue && (
          <div css={styles.attendanceValue()}>
            <span css={styles.attendanceLabel()}>Attendance:</span>
            {formattedAttendanceValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
