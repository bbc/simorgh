// import React from 'react';
// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';
import {
  SPACING_1,
  SPACING_2,
  GROUP_3,
  SPACING_4,
  fontScaleDescription,
  fontScaleBody,
  createSize,
} from '@bbc/web-gel-foundations';
import { getStyledLineColour } from '../helpers/colour-styles.js';

const StyledFooter = styled.div`
  ${fontScaleDescription}
  padding-bottom: ${SPACING_4};
  text-align: center;

  @media (min-width: ${GROUP_3}) {
    ${fontScaleBody}
    padding-bottom: ${SPACING_2};
  }
`;

const FooterTextWrapper = styled.div`
  display: inline-block;
  font-size: ${createSize(13)};

  &:not(:first-child) {
    margin-left: ${SPACING_2};
  }
`;

const Venue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: ${SPACING_1};
`;

const AttendanceValue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const VenueLabel = styled.span`
  color: ${({ theme }) => theme.colourPalette.secondary};
  padding-right: ${SPACING_1};
`;

const AttendanceLabel = styled.span`
  color: ${({ theme }) => theme.colourPalette.secondary};
  padding-right: ${SPACING_1};
`;

const HorizontalRule = styled.hr`
  width: ${createSize(12)};
  border: none;
  border-top: 1px solid ${({ theme, status, isConciseView }) => getStyledLineColour({ theme, status, isConciseView })};
  padding-bottom: ${SPACING_1};
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
