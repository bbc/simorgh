import React, { use } from 'react';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';

const ScriptLink = () => {
  const { scriptLink } = use(ServiceContext);
  const { pathname, variant: currentVariant } = use(RequestContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');

  const { text, variant: alternateVariant } = scriptLink || {};

  if (!pathname) return null;
  if (!scriptLinkEnabled) return null;
  if (!alternateVariant) return null;

  const pathPartsWithoutExtension = pathname
    .replace(/\.[^/.]+$/, '') // remove any extensions, we don't want to link to AMP pages directly
    .split('/');

  const currentVariantIndex = pathPartsWithoutExtension.indexOf(
    currentVariant as string,
  );

  pathPartsWithoutExtension[currentVariantIndex] = alternateVariant;
  const pathToVariant = pathPartsWithoutExtension.join('/');

  return (
    <a
      className="
        focusIndicatorRemove
        text-white
        text-gel-brevier
        font-gel-sans-regular
        bg-gel-postbox
        no-underline
        block
        py-2
        px-4
        group-2:p-2
        group-2:mx-2
        group-2:rounded-[0.125rem]
        group-2:text-center
        group-2:inline-block
        group-2:transition-transform
        group-2:duration-300
        group-2:hover:scale-110
        group-2:focus:scale-110
        group-2:motion-reduce:hover:scale-100
        group-2:motion-reduce:focus:scale-100
        group-2:motion-reduce:transition-none
      "
      href={pathToVariant}
      data-variant={alternateVariant}
    >
      <span>{text}</span>
    </a>
  );
};

export default ScriptLink;
