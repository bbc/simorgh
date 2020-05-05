import React from 'react';
import styled from 'styled-components';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { string } from 'prop-types';

const StyledForm = styled.form`
  margin-top: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
`;

const IncludeTestForm = ({ pathWithGetParameters }) => {
  const testUrl = decodeURIComponent(
    pathWithGetParameters.replace('?testUrl=', ''),
  );

  return (
    <StyledForm method="get">
      <label htmlFor="includes">
        Include Test URL:
        <input type="text" name="testUrl" id="includes" placeholder={testUrl} />
      </label>
      <input type="submit" value="Submit" />
    </StyledForm>
  );
};

IncludeTestForm.propTypes = {
  pathWithGetParameters: string.isRequired,
};

export default IncludeTestForm;
