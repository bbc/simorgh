import React from 'react';
import {
  chartbeatUID,
  useCanonical,
  getSylphidCookie,
} from '../../../lib/analyticsUtils/chartbeat';

const domain = 'test.bbc.co.uk';

const inlinedScriptSnippet = () => `
 (function() {
 var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
 _sf_async_config.uid = ${chartbeatUID};
 _sf_async_config.domain = "${domain}"; 
 _sf_async_config.flickerControl = false;
 _sf_async_config.useCanonical = ${useCanonical};
 _sf_async_config.useCanonicalDomain = ${useCanonical};
 _sf_async_config.sections = '';
 _sf_async_config.idSync = {
  bbc_hid: ${getSylphidCookie()}
 };
 function loadChartbeat() {
  var e = document.createElement('script');
  var n = document.getElementsByTagName('script')[0];
  e.type = 'text/javascript';
  e.async = true;
  e.src = '//static.chartbeat.com/js/chartbeat.js';
  n.parentNode.insertBefore(e, n);
 }
 loadChartbeat();
 })();
 `;

/* eslint-disable react/no-danger */
const CanonicalChartbeatBeacon = () => (
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{ __html: inlinedScriptSnippet() }}
  />
);

export default CanonicalChartbeatBeacon;
