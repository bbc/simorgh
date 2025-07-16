import React, { MouseEvent, use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Link from './Link';
import List from './List';

const openPrivacyManagerModal = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  // @ts-expect-error dotcom is required for ads
  if (window.dotcom?.openPrivacyManagerModal) {
    // @ts-expect-error dotcom is required for ads
    window.dotcom.openPrivacyManagerModal();
  }
};

export default () => {
  const { showAdsBasedOnLocation } = use(RequestContext);
  const { footer } = use(ServiceContext);

  const {
    externalLink,
    links,
    extraLinks,
    copyrightText,
    trustProjectLink,
    collectiveNewsroomText,
  } = footer;

  const extraLinkElements =
    Array.isArray(extraLinks) && extraLinks.length > 0
      ? extraLinks.map(({ id, text, href, lang }) => (
          <Link key={id || href} text={text} href={href} lang={lang} />
        ))
      : [];

  const elements = links
    ?.map(({ id, text, href, lang }) => {
      if (id === 'COOKIE_SETTINGS') {
        if (showAdsBasedOnLocation) {
          return (
            <Link
              text={text}
              href={href}
              lang={lang}
              onClick={openPrivacyManagerModal}
              onlyShowIfJSenabled
            />
          );
        }
      } else {
        return <Link text={text} href={href} lang={lang} />;
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="
      text-gel-brevier 
      font-gel-sans-regular 
      bg-gel-ebon 
      px-8 
      group-1:px-4
    ">
      <div
        className={`
          max-w-group-4 
          mx-auto 
          ${trustProjectLink ? 'pt-4' : ''}
        `}
      >
        <List elements={elements} trustProjectLink={trustProjectLink} />
        {extraLinkElements.length > 0 && (
          <List elements={extraLinkElements} extraLinks />
        )}
        {collectiveNewsroomText && (
          <p className="
            border-b 
            border-gel-shadow 
            text-white 
            m-0 
            py-8
          ">
            {collectiveNewsroomText}
          </p>
        )}
        <p className="
          text-white 
          m-0 
          py-8
          [&_a]:p-0
        ">
          <span lang="en-GB">{`\u00A9`} </span>
          {`${new Date().getFullYear()} ${copyrightText}`}{' '}
          {externalLink && (
            <Link text={externalLink?.text} href={externalLink?.href} inline />
          )}
        </p>
      </div>
    </div>
  );
};
