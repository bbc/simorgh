import React from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';

const LearningEnglishPage = ({ route, pathname, bbcOrigin, previousPath }) => {
  return (
    <>
      <h2>Learnig English Index</h2>
      {renderRoutes(route.routes, { pathname, bbcOrigin, previousPath })}
    </>
  );
};

export default LearningEnglishPage;
