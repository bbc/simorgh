var sizes = [300, 450, 600, 1024];
var landscapeImageUrl = "https://ichef.bbci.co.uk/news/[WIDTH]/cpsprodpb/7098/production/_104842882_students.jpg";
var portraitImageUrl = "https://ichef.bbci.co.uk/news/[WIDTH]/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png";
var squareImageUrl = "https://ichef.bbci.co.uk/news/[WIDTH]/cpsprodpb/114FE/production/_104801907_79010.jpg";
var customImageUrl = "https://ichef.bbci.co.uk/news/[WIDTH]/cpsprodpb/164BB/production/_104032319_03270dcc-9dda-4bd4-96a0-db89f6b915ae.jpg";
export var landscape = {
  alt: 'Student sitting an exam',
  attribution: '',
  sizes: '100vw',
  src: landscapeImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes.map(function (size) {
    return "".concat(landscapeImageUrl.replace('[WIDTH]', size), " ").concat(size, "w");
  }).join(', '),
  width: 1024,
  height: 576
};
export var portrait = {
  alt: 'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  attribution: 'BBC',
  sizes: '100vw',
  src: portraitImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes.map(function (size) {
    return "".concat(portraitImageUrl.replace('[WIDTH]', size), " ").concat(size, "w");
  }).join(', '),
  width: 1024,
  height: 1280
};
export var square = {
  alt: 'Tracks through the snow',
  attribution: 'BBC',
  sizes: '100vw',
  src: squareImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes.map(function (size) {
    return "".concat(squareImageUrl.replace('[WIDTH]', size), " ").concat(size, "w");
  }).join(', '),
  width: 1024,
  height: 1024
};
export var custom = {
  alt: 'By Elisa Decker, from her series "Sidewalk"',
  attribution: 'Elisa Decker',
  sizes: '100vw',
  src: customImageUrl.replace('[WIDTH]', sizes[0]),
  srcset: sizes.map(function (size) {
    return "".concat(customImageUrl.replace('[WIDTH]', size), " ").concat(size, "w");
  }).join(', '),
  width: 445,
  height: 547
};