// import React from 'react';
// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';
// import {
//   SPACING_1,
//   SPACING_2,
//   GROUP_3,
//   SPACING_4,
//   fontScaleDescription,
//   fontScaleBody,
//   createSize,
// } from '@bbc/web-gel-foundations';
// import { getStyledLineColour } from '../helpers/colour-styles.js';

interface FooterProps {
  venue: string;
  attendanceValue?: number;
  attendanceInfo?: string;
}

const Footer = ({ venue, attendanceValue, attendanceInfo }: FooterProps) => {
  const formattedAttendanceValue = attendanceValue?.toLocaleString();

  return (
    <StyledFooter>
      <HorizontalRule aria-hidden status={status} />
      <FooterTextWrapper>
        <Venue>
          <VenueLabel>Venue:</VenueLabel>
          {attendanceInfo ? `${venue} (${attendanceInfo})` : venue}
        </Venue>
      </FooterTextWrapper>
      <FooterTextWrapper>
        {attendanceValue && (
          <AttendanceValue>
            <AttendanceLabel>Attendance:</AttendanceLabel>
            {formattedAttendanceValue}
          </AttendanceValue>
        )}
      </FooterTextWrapper>
    </StyledFooter>
  );
};

export default Footer;
