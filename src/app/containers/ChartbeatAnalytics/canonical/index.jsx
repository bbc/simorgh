import React from 'react';
import { string, bool, number } from 'prop-types';
import Helmet from 'react-helmet';

const CanonicalChartbeatBeacon = ({
  domain,
  type,
  sections,
  cookie,
  chartbeatUID,
  useCanonical,
  chartbeatSource,
}) => (
  <Helmet>
    <script async type="text/javascript">
      {`
        (function(){
          var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
          _sf_async_config.uid = ${chartbeatUID};
          _sf_async_config.domain = "${domain}";
          _sf_async_config.useCanonical = ${useCanonical};
          _sf_async_config.useCanonicalDomain = ${useCanonical};
          _sf_async_config.contentType = "${type}";
          _sf_async_config.sections = "${sections}";
          _sf_async_config.idSync = {
           bbc_hid: "${cookie}"
          };
          function loadChartbeat() {
           var e = document.createElement('script');
           var n = document.getElementsByTagName('script')[0];
           e.type = 'text/javascript';
           e.async = true;
           e.src = "${chartbeatSource}";
           n.parentNode.insertBefore(e, n);
          }
          loadChartbeat();
        })();
      `}
    </script>
  </Helmet>
);

CanonicalChartbeatBeacon.propTypes = {
  domain: string.isRequired,
  type: string.isRequired,
  sections: string.isRequired,
  cookie: string,
  chartbeatUID: number.isRequired,
  useCanonical: bool.isRequired,
  chartbeatSource: string.isRequired,
};

CanonicalChartbeatBeacon.defaultProps = {
  cookie: null,
};

export default CanonicalChartbeatBeacon;
