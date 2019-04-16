import React from 'react';
import { string } from 'prop-types';

const snippet = apiKey => `
  window.BOOMR_config = window.BOOMR_config || {};
  BOOMR_config.autorun = false;
  BOOMR_config.History = {
      auto: true,
      enabled: true
  };

  (function(){
    if (window.BOOMR && window.BOOMR.version) { return; }
    var dom,doc,where,iframe = document.createElement("iframe"),win = window;

    function boomerangSaveLoadTime(e) {
      win.BOOMR_onload=(e && e.timeStamp) || new Date().getTime();
    }
    if (win.addEventListener) {
      win.addEventListener("load", boomerangSaveLoadTime, false);
    } else if (win.attachEvent) {
      win.attachEvent("onload", boomerangSaveLoadTime);
    }

    iframe.src = "javascript:void(0)";
    iframe.title = ""; iframe.role = "presentation";
    (iframe.frameElement || iframe).style.cssText = "width:0;height:0;border:0;display:none;";
    where = document.getElementsByTagName("script")[0];
    where.parentNode.insertBefore(iframe, where);

    try {
      doc = iframe.contentWindow.document;
    } catch(e) {
      dom = document.domain;
      iframe.src="javascript:var d=document.open();d.domain='"+dom+"';void(0);";
      doc = iframe.contentWindow.document;
    }
    doc.open()._l = function() {
      var js = this.createElement("script");
      if (dom) { this.domain = dom; }
      js.id = "boomr-if-as";
      js.src = "https://s.go-mpulse.net/boomerang/${apiKey}";
      BOOMR_lstart=new Date().getTime();
      this.body.appendChild(js);
    };
    doc.write('<body onload="document._l();">');
    doc.close();
  })();
`;

/* eslint-disable react/no-danger */
/* disabling the rule that bans the use of dangerouslySetInnerHTML until a more appropriate implementation can be implemented */
const MPulseBeacon = ({ apiKey }) => (
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{ __html: snippet(apiKey) }}
  />
);

MPulseBeacon.propTypes = {
  apiKey: string.isRequired,
};

export default MPulseBeacon;
