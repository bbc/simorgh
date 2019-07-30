// Shared browser feature checks:
import sharedFeatureChecks from '@bbc/news-vj-tools-prototype-core-js-checks';
// Overriding browser feature checks / missing checks:
import overriddenFeatureChecks from './browserFeatureChecksOverrides';
import {
  readCoreJsOutputFile,
  convertObjectToString,
  filterPolyfillChecks,
} from './utils';

const listFeatureChecks = readCoreJsOutputFile();
const filteredBrowserFeatureChecks = filterPolyfillChecks(
  listFeatureChecks,
  overriddenFeatureChecks,
  sharedFeatureChecks,
);

// we convert the object to string, including the functions:
const checksObjectAsString = convertObjectToString(
  filteredBrowserFeatureChecks,
);

const progressiveEnhancement = (assets, checksObject) => {
  const runAllChecks = () => {
    try {
      let allTestsPassed = true;
      Object.keys(checksObject).forEach(testProperty => {
        // if one test fails:
        const testResult = checksObject[testProperty]();
        if (!testResult) {
          allTestsPassed = false;
        }
      });

      if (allTestsPassed) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const convertTextNodeToELement = node => {
    const tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = node.textContent;
    return tempWrapper.firstChild;
  };

  const removeNoscriptNodes = () => {
    const noscriptElements = document.querySelectorAll('noscript');
    for (let i = 0; i < noscriptElements.length; i += 1) {
      const noscriptNode = noscriptElements[i];
      while (noscriptNode.firstChild) {
        const currentChildNode = noscriptNode.firstChild;
        // convert text node to element if text:
        const elementToMove =
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
    assets.forEach(assetUrl => {
      // if successful, add scripts to DOM:
      const script = document.createElement('script');
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

const progressiveEnhancementJsString = assets => {
  // function progressiveEnhancement on client will execute with 2 params: the assets and the list of checks as an stringified object:
  return `(${progressiveEnhancement.toString()})(${JSON.stringify(
    assets,
  )}, ${checksObjectAsString})`;
};

export default progressiveEnhancementJsString;
