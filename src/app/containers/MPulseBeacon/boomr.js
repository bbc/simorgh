/* eslint-disable */

/*
 * This file contains the JS code snippet that was provided by mpulse. It
 * is a direct copy and paste and thus has not been refactored or tested.
 */

const boomr = (apiKey) => {
  if (window.BOOMR && (window.BOOMR.version || window.BOOMR.snippetExecuted)) {
    return;
  }
  window.BOOMR_config = {
    Early: {
      enabled: true,
    },
    Akamai: {
      enabled: false,
    },
  };
  window.BOOMR = window.BOOMR || {};
  window.BOOMR.snippetStart = new Date().getTime();
  window.BOOMR.snippetExecuted = true;
  window.BOOMR.snippetVersion = 12;
  window.BOOMR.url = `https://s.go-mpulse.net/boomerang/${apiKey}`;
  var where =
      document.currentScript || document.getElementsByTagName('script')[0],
    promoted = false,
    LOADER_TIMEOUT = 3000;
  function promote() {
    if (promoted) {
      return;
    }
    var script = document.createElement('script');
    script.id = 'boomr-scr-as';
    script.src = window.BOOMR.url;
    script.async = true;
    where.parentNode.appendChild(script);
    promoted = true;
  }
  function iframeLoader(wasFallback) {
    promoted = true;
    var dom,
      doc = document,
      bootstrap,
      iframe,
      iframeStyle,
      win = window;
    window.BOOMR.snippetMethod = wasFallback ? 'if' : 'i';
    bootstrap = function (parent, scriptId) {
      var script = doc.createElement('script');
      script.id = scriptId || 'boomr-if-as';
      script.src = window.BOOMR.url;
      window.BOOMR_lstart = new Date().getTime();
      parent = parent || doc.body;
      parent.appendChild(script);
    };
    if (
      !window.addEventListener &&
      window.attachEvent &&
      navigator.userAgent.match(/MSIE [67]./)
    ) {
      window.BOOMR.snippetMethod = 's';
      bootstrap(where.parentNode, 'boomr-async');
      return;
    }
    iframe = document.createElement('IFRAME');
    iframe.src = 'about:blank';
    iframe.title = '';
    iframe.role = 'presentation';
    iframe.loading = 'eager';
    iframeStyle = (iframe.frameElement || iframe).style;
    iframeStyle.width = 0;
    iframeStyle.height = 0;
    iframeStyle.border = 0;
    iframeStyle.display = 'none';
    where.parentNode.appendChild(iframe);
    try {
      win = iframe.contentWindow;
      doc = win.document.open();
    } catch (e) {
      dom = document.domain;
      iframe.src =
        "javascript:var d=document.open();d.domain='" + dom + "';void(0);";
      win = iframe.contentWindow;
      doc = win.document.open();
    }
    if (dom) {
      doc._boomrl = function () {
        this.domain = dom;
        bootstrap();
      };
      doc.write('<bo' + "dy onload='document._boomrl();'>");
    } else {
      win._boomrl = function () {
        bootstrap();
      };
      if (win.addEventListener) {
        win.addEventListener('load', win._boomrl, false);
      } else if (win.attachEvent) {
        win.attachEvent('onload', win._boomrl);
      }
    }
    doc.close();
  }
  var link = document.createElement('link');
  if (
    link.relList &&
    typeof link.relList.supports === 'function' &&
    link.relList.supports('preload') &&
    'as' in link
  ) {
    window.BOOMR.snippetMethod = 'p';
    link.href = window.BOOMR.url;
    link.rel = 'preload';
    link.as = 'script';
    link.addEventListener('load', promote);
    link.addEventListener('error', function () {
      iframeLoader(true);
    });
    setTimeout(function () {
      if (!promoted) {
        iframeLoader(true);
      }
    }, LOADER_TIMEOUT);
    window.BOOMR_lstart = new Date().getTime();
    where.parentNode.appendChild(link);
  } else {
    iframeLoader(false);
  }
  function boomerangSaveLoadTime(e) {
    window.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();
  }
  if (window.addEventListener) {
    window.addEventListener('load', boomerangSaveLoadTime, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', boomerangSaveLoadTime);
  }
};

export default boomr;
