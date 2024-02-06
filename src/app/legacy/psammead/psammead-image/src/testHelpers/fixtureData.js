const sizes = [300, 450, 600, 1024];
const landscapeImageUrl = `https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/7098/production/_104842882_students.jpg`;
const portraitImageUrl = `https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png`;
const squareImageUrl = `https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/114FE/production/_104801907_79010.jpg`;
const customImageUrl = `https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/164BB/production/_104032319_03270dcc-9dda-4bd4-96a0-db89f6b915ae.jpg`;

export const landscape = {
  alt: 'Student sitting an exam',
  attribution: '',
  sizes: '100vw',
  src: landscapeImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes
    .map(size => `${landscapeImageUrl.replace('[WIDTH]', size)}.webp ${size}w`)
    .join(', '),
  fallbackSrcset: sizes
    .map(size => `${landscapeImageUrl.replace('[WIDTH]', size)} ${size}w`)
    .join(', '),
  primaryMimeType: 'image/webp',
  fallbackMimeType: 'image/jpeg',
  width: 1024,
  height: 576,
};

export const portrait = {
  alt: 'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  attribution: 'BBC',
  sizes: '100vw',
  src: portraitImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes
    .map(size => `${portraitImageUrl.replace('[WIDTH]', size)}.webp ${size}w`)
    .join(', '),
  fallbackSrcset: sizes
    .map(size => `${portraitImageUrl.replace('[WIDTH]', size)} ${size}w`)
    .join(', '),
  primaryMimeType: 'image/webp',
  fallbackMimeType: 'image/jpeg',
  width: 1024,
  height: 1280,
};

export const square = {
  alt: 'Tracks through the snow',
  attribution: 'BBC',
  sizes: '100vw',
  src: squareImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes
    .map(size => `${squareImageUrl.replace('[WIDTH]', size)}.webp ${size}w`)
    .join(', '),
  fallbackSrcset: sizes
    .map(size => `${squareImageUrl.replace('[WIDTH]', size)} ${size}w`)
    .join(', '),
  primaryMimeType: 'image/webp',
  fallbackMimeType: 'image/jpeg',
  width: 1024,
  height: 1024,
};

export const custom = {
  alt: 'By Elisa Decker, from her series "Sidewalk"',
  attribution: 'Elisa Decker',
  sizes: '100vw',
  src: customImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes
    .map(size => `${customImageUrl.replace('[WIDTH]', size)}.webp ${size}w`)
    .join(', '),
  fallbackSrcset: sizes
    .map(size => `${customImageUrl.replace('[WIDTH]', size)} ${size}w`)
    .join(', '),
  primaryMimeType: 'image/webp',
  fallbackMimeType: 'image/jpeg',
  width: 445,
  height: 547,
};

export const noFallbackSrcset = {
  alt: 'Student sitting an exam',
  attribution: '',
  sizes: '100vw',
  src: landscapeImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes
    .map(size => `${landscapeImageUrl.replace('[WIDTH]', size)} ${size}w`)
    .join(', '),
  primaryMimeType: 'image/jpeg',
  width: 1024,
  height: 576,
};
