/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import useToggle from '#hooks/useToggle';

const AdSlot = ({ type }) => {
  const location = useLocation();
  useEffect(() => {
    window.dotcom.cmd.push(() => {
      window.dotcom.ads.registerSlot(type);
    });
  }, [location, type]);

  return <div id={`dotcom-${type}`} className="dotcom-ad" />;
};

AdSlot.propTypes = {
  type: string.isRequired,
};

const CanonicalAd = () => {
  useEffect(() => {
    window.dotcom.bootstrap({
      pageAds: true,
      playerAds: false,
    });
  }, []);

  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script src="https://gn-web-assets.api.bbc.com/ngas/beta/dotcom-bootstrap.js" />
      </Helmet>
      <AdSlot type="leaderboard" />
    </>
  );
};

export default CanonicalAd;
