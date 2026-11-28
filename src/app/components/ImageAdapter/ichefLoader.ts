import type { ImageLoaderProps } from 'next/image';

const ALLOWED_HOSTS = ['ichef.bbci.co.uk', 'ichef.test.bbci.co.uk'];

// URL encodes the template braces in the pathname as %7B and %7D.
const ACE_TEMPLATE_PATH = /^\/ace\/(?:ws|standard)\/%7Bwidth%7D\/[^?#]+$/;

const parseTemplate = (src: string) => {
  try {
    return new URL(src);
  } catch {
    return null;
  }
};

// Custom loaders bypass `images.remotePatterns`, so the adapter owns its source policy.
export const isImageAdapterSource = (src?: string): src is string => {
  if (!src) return false;

  const url = parseTemplate(src);

  return Boolean(
    url &&
    url.protocol === 'https:' &&
    ALLOWED_HOSTS.includes(url.hostname) &&
    !url.port &&
    !url.username &&
    !url.password &&
    !url.search &&
    !url.hash &&
    ACE_TEMPLATE_PATH.test(url.pathname),
  );
};

// Only resolves the width; iChef owns resizing, encoding and delivery.
export const ichefLoader = ({ src, width }: ImageLoaderProps) => {
  if (!isImageAdapterSource(src) || !Number.isInteger(width) || width <= 0) {
    throw new TypeError(
      'ImageAdapter expects an HTTPS iChef ace {width} template and a positive integer width',
    );
  }

  return src.replace('{width}', String(width));
};
