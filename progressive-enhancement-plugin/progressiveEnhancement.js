/* eslint-disable func-names, no-var, vars-on-top */
// Shared browser feature checks:
const sharedFeatureChecks = require('@bbc/news-vj-tools-prototype-core-js-checks');
// Overriding browser feature checks / missing checks:
const overriddenFeatureChecks = require('./overrides/browserFeatureChecksOverrides');
const utils = require('./utils');

const getProgressiveEnhancementString = listFeatureChecks => {
  // Retrieve checks from shared or overriden checks:
  const filteredBrowserFeatureChecks = utils.filterPolyfillChecks(
    listFeatureChecks,
    overriddenFeatureChecks,
    sharedFeatureChecks,
  );

  // we convert the object to an array, including the functions:
  const checksObjectAsString = utils.convertObjectToStringArray(
    filteredBrowserFeatureChecks,
  );

  // From list of required checks (from core-js), output IIFE function as a string, which will execute on client with 2 params: the assets, and the list of checks as an stringified array of functions:
  // ES5 as code not (yet) ran through Babel:
  const progressiveEnhancement = function(assets, checksObject) {
    var runAllChecks = function() {
      try {
        var allChecksPassed = true;
        checksObject.forEach(function(check) {
          // if one test fails:
          var checkResult = check();
          if (!checkResult) {
            allChecksPassed = false;
          }
        });

        if (allChecksPassed) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    };

    var convertTextNodeToELement = function(node) {
      var tempWrapper = document.createElement('div');
      tempWrapper.innerHTML = node.textContent;
      return tempWrapper.firstChild;
    };

    var removeNoscriptNodes = function() {
      var noscriptElements = document.querySelectorAll('noscript');
      for (var i = 0; i < noscriptElements.length; i += 1) {
        var noscriptNode = noscriptElements[i];
        while (noscriptNode.firstChild) {
          var currentChildNode = noscriptNode.firstChild;
          // convert text node to element if text:
          var elementToMove =
            currentChildNode.nodeType === 3
              ? convertTextNodeToELement(currentChildNode)
              : currentChildNode;

          noscriptNode.parentNode.insertBefore(elementToMove, noscriptNode);

          currentChildNode.parentNode.removeChild(currentChildNode);
        }

        noscriptNode.parentNode.removeChild(noscriptNode);
      }
    };

    if (runAllChecks(checksObject)) {
      assets.forEach(function(assetUrl) {
        // if successful, add each script to DOM:
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = assetUrl;
        script.defer = 'defer';
        document.body.appendChild(script);
      });
    } else {
      // remove Noscript nodes to make content same as browsers without JS
      removeNoscriptNodes();
    }
  };

  const progressiveEnhancementJsString = `(${progressiveEnhancement.toString()})("{{assets}}", ${checksObjectAsString})`;
  return progressiveEnhancementJsString;
};

module.exports = getProgressiveEnhancementString;
