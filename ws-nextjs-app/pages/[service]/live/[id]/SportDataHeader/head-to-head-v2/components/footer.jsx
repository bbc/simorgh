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

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

const StyledFooter = styled.div`
  font-size: 14px;
  line-height: 1.2857142857142858;
  padding-bottom: 16px;
  text-align: center;

  @media (min-width: '${pixelsToRem(600)}rem') {
    font-size: 1rem;
    line-height: 1.375;
    padding-bottom: 8px;
  }
`;

const FooterTextWrapper = styled.div`
  display: inline-block;
  font-size: '${pixelsToRem(13)}rem';

  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const Venue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 4px;
`;

const AttendanceValue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const VenueLabel = styled.span`
  color: '#A8A8A8';
  padding-right: 4px;
`;

const AttendanceLabel = styled.span`
  color: '#A8A8A8';
  padding-right: 4px;
`;

const HorizontalRule = styled.hr`
  width: '${pixelsToRem(12)}rem';
  border: none;
  ${
    '' /* border-top: 1px solid ${({ theme, status, isConciseView }) => getStyledLineColour({ theme, status, isConciseView })};
     */
  }
  border-top: '1px solid #FFD230';
  padding-bottom: 4px;
`;

const Footer = ({ venue, status, attendanceValue, attendanceInfo }) => {
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
