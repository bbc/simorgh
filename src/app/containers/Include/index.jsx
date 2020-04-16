/* eslint-disable react/no-danger */
import React, { useRef, useEffect } from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';
import {
  createAppendScriptByCode,
  createAppendScriptBySrc,
} from './createAppendScript';

const IncludeContainer = ({ html = '', type }) => {
  const scriptTagRegExp = new RegExp(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);
  const { enabled } = useToggle('include');
  const isInitialMount = useRef(true);

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
  };

  const shouldNotRenderInclude = !enabled || !html || !supportedTypes[type];

  // Keep the DOM up to date with our script tags.
  useEffect(() => {
    const originalHtml = html || '';
    const scriptTagMatches = originalHtml.matchAll(scriptTagRegExp);
    const scriptTags = Array.from(scriptTagMatches);
    async function placeScriptsOneAfterTheOther() {
      isInitialMount.current = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const scriptTag of scriptTags) {
        const [textContent, contents] = scriptTag;
        const srcRegex = new RegExp(/src="(.*?)"/gm);
        const [srcContent] = Array.from(textContent.matchAll(srcRegex));
        if (srcContent) {
          const [src] = srcContent.slice(-1);
          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptBySrc('', src);
        } else {
          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptByCode(contents);
        }
      }
    }
    if (isInitialMount.current) {
      placeScriptsOneAfterTheOther();
    }
  }, [html, type, scriptTagRegExp]);

  if (shouldNotRenderInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: (html || '').replace(scriptTagRegExp, ''),
        }}
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
