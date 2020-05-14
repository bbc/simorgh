/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';

const AdSlot = ({ type }) => {
  const location = useLocation();
  useEffect(() => {
    if (window.dotcom) {
      window.dotcom.cmd.push(() => {
        window.dotcom.ads.registerSlot(type);
      });
    }
  }, [location, type]);

  return <div id={`dotcom-${type}`} className="dotcom-ad" />;
};

AdSlot.propTypes = {
  type: string.isRequired,
};

const CanonicalAd = () => {
  useEffect(() => {
    if (window.dotcom) {
      window.dotcom.bootstrap({
        pageAds: true,
        playerAds: false,
      });
    }
  });

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
