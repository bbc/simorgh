import { useEffect, useContext } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import getAtiUrl from './getAtiUrl';
import deepGet from '../../helpers/json/deepGet';

const ATI = ({ articleData }) => {
  const { platform, isUK, env, href, referrer } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const optimoId = deepGet(['promo', 'id'], articleData);

  const AtiUrl = getAtiUrl({
    articleData,
    service,
    platform,
    isUK,
    env,
    href,
    referrer,
  });

  useEffect(() => {
    try {
      fetch(AtiUrl);
    } catch (e) {
      console.error(e);
    }
  }, [optimoId]);

  return null;
};

ATI.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default ATI;
