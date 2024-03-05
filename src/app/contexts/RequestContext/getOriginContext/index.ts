// import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const getOriginContext = (bbcOrigin: string | null) => {
  let origin = 'https://www.bbc.co.uk';

  if (bbcOrigin) {
    origin = bbcOrigin;
  } else if (
    process &&
    process.env &&
    process.env.SIMORGH_APP_ENV === 'local'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    origin = process.env.SIMORGH_BASE_URL!;
  } else if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.origin
  ) {
    origin = window.location.origin; // eslint-disable-line prefer-destructuring
  }

  return {
    origin,
  };
};

export default getOriginContext;
