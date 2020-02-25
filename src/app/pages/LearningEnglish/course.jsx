import React from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';

const LearningEnglishCoursePage = ({ route }) => {
  return (
    <>
      <h2>Learnig English Index</h2>
      {renderRoutes(route.routes)}
    </>
  );
};

export default withRouter(LearningEnglishCoursePage);
