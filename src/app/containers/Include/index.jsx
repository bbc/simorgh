/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';

const IncludeContainer = ({ html = '', type }) => {
  const scriptTagRegExp = new RegExp(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);
  const { enabled } = useToggle('include');
  const [originalHtml, setOriginalHtml] = useState(html || '');
  const [ssrHtml, setSsrHtml] = useState(
    originalHtml.replace(scriptTagRegExp, ''),
  );

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
  };

  const shouldNotRenderInclude = !enabled || !html || !supportedTypes[type];

  const createAppendScriptTag = (code, src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      if (src) {
        script.src = src;
        // eslint-disable-next-line func-names
        script.onload = function () {
          resolve();
        };
      } else if (code) {
        script.appendChild(document.createTextNode(code));
      }
      // eslint-disable-next-line func-names
      script.onerror = function () {
        reject();
      };
      document.body.append(script);
      if (code) {
        resolve();
      }
    });
  };

  // Keep the DOM up to date with our script tags.
  useEffect(() => {
    setOriginalHtml(html || '');
    setSsrHtml(originalHtml.replace(scriptTagRegExp, ''));
    const scriptTagMatches = originalHtml.matchAll(scriptTagRegExp);
    const scriptTags = Array.from(scriptTagMatches);
    console.log({ html });
    async function placeScriptsOneAfterTheOther() {
      // eslint-disable-next-line no-restricted-syntax
      for (const scriptTag of scriptTags) {
        const [textContent, contents] = scriptTag;
        const srcRegex = new RegExp(/src="(.*?)"/gm);
        const [srcContent] = Array.from(textContent.matchAll(srcRegex));
        if (srcContent) {
          const [src] = srcContent.slice(-1);
          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptTag('', src);
        } else {
          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptTag(contents);
        }
      }
    }
    placeScriptsOneAfterTheOther();
  }, [html, originalHtml, scriptTagRegExp]);

  if (shouldNotRenderInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: ssrHtml }}
      />
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  html: string,
  type: string.isRequired,
};

IncludeContainer.defaultProps = {
  html: null,
};

export default IncludeContainer;
