import { getEnvConfig } from '#lib/utilities/getEnvConfig';

const getOriginContext = (bbcOrigin: string | null) => {
  let origin = 'https://www.bbc.co.uk';

  if (bbcOrigin) {
    origin = bbcOrigin;
  } else if (
    process &&
    process.env &&
    getEnvConfig().SIMORGH_APP_ENV === 'local'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    origin = getEnvConfig().SIMORGH_BASE_URL!;
  } else if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.origin
  ) {
    origin = window.location.origin;
  }

  return {
    origin,
  };
};

export default getOriginContext;
