export const POC_IMAGE_TEMPLATE =
  'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/34c4/live/ced26e80-ccaa-11f1-8789-fd6bb060c3f9.jpg';

// Explicit candidates for the reference/AMP paths; Next.js uses its configured
// widths instead. This experimental ladder does not change global configuration.
export const POC_IMAGE_WIDTHS = [
  240, 320, 480, 624, 800, 1280, 1600, 1920, 2560,
];
export const POC_IMAGE_SIZES =
  '(max-width: 775px) calc(100vw - 34px), (max-width: 1231px) calc((100vw - 60px) / 2), 587px';

// A 16:9 source cropped to 3:4 is scaled by (16 / 9) / (3 / 4).
export const POC_PORTRAIT_SIZES =
  '(max-width: 775px) calc((100vw - 34px) * 2.3704), (max-width: 1231px) calc((100vw - 60px) * 1.1852), 1392px';

type IchefLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

export const ichefLoader = ({ src, width }: IchefLoaderParams) => {
  const url = new URL(src);

  // Custom loaders bypass remotePatterns enforcement, so validate sources here.
  // URL encodes the template braces in pathname as %7B and %7D.
  if (
    url.protocol !== 'https:' ||
    url.host !== 'ichef.bbci.co.uk' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !url.pathname.startsWith('/ace/ws/%7Bwidth%7D/') ||
    !Number.isInteger(width) ||
    width <= 0
  ) {
    throw new TypeError(
      'Expected an HTTPS iChef width template and positive integer width',
    );
  }

  // iChef owns encoding quality; this loader only resolves the requested width.
  return src.replace('{width}', String(width));
};

// iChef's WebP variant appends .webp to the original JPEG path.
export const withWebp = (src: string) =>
  src.endsWith('.webp') ? src : `${src}.webp`;

export const withJpegFallback = (src: string) => src.replace(/\.webp$/, '');

export const createSrcSet = (
  template: string,
  widths: number[] = POC_IMAGE_WIDTHS,
) =>
  widths
    .map(width => `${template.replace('{width}', String(width))} ${width}w`)
    .join(', ');

// Prepare explicit source sets for reference/AMP rendering and a template for
// Next.js to generate its own WebP candidates through the validated loader.
export const createImageSources = (template: string) => {
  const fallbackTemplate = withJpegFallback(template);
  const primaryTemplate = withWebp(template);

  return {
    src: primaryTemplate.replace('{width}', '624'),
    primaryTemplate,
    primarySrcSet: createSrcSet(primaryTemplate),
    fallbackSrcSet: createSrcSet(fallbackTemplate),
  };
};
