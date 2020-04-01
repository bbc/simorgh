import React from 'react';

const IncludeTestForm = ({ getParameters }) => {
  // const params = new URL(window.document.location).searchParams;
  // const testUrl = params.get('testUrl');

  const testUrl = decodeURIComponent(getParameters.search.replace('?testUrl=', ''));


  return (
    <form method="get">
      <label htmlFor="includes">
        test URL:
        <input type="text" name="testUrl" id="includes" placeholder={testUrl} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default IncludeTestForm;

