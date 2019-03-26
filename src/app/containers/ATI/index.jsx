import React from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import getAtiUrl from './getAtiUrl';

const ATI = ({ articleData }) => (
  <RequestContextConsumer>
    {({ platform, isUK, env, href, referrer }) => (
      <ServiceContextConsumer>
        {({ service }) => {
          const AtiUrl = getAtiUrl({
            articleData,
            service,
            platform,
            isUK,
            env,
            href,
            referrer,
          });

          return <h1>{AtiUrl}</h1>;
        }}
      </ServiceContextConsumer>
    )}
  </RequestContextConsumer>
);

ATI.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default ATI;
