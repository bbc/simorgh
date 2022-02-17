const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const fixtureHeading = () =>
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed lacus mi. In sed nunc non ante viverra aliquam. Quisque aliquam scelerisque eros, semper fermentum ipsum vehicula eu. Integer nec.'
    .split(' ')
    .slice(0, rand(5, 30))
    .join(' ');
const fixtureCat = () =>
  `http://placekitten.com/${rand(200, 300)}/${rand(170, 250)}`;

// eslint-disable-next-line import/prefer-default-export
export const fixturePromos = () =>
  new Array(23).fill().map((_, id) => {
    const mediaType = ['VIDEO', 'AUDIO', 'PHOTO_GALLERY', null][rand(0, 4)];
    return {
      id,
      heading: fixtureHeading(),
      href: '#',
      imageSrc: fixtureCat(),
      imageAlt: 'evil monster',
      timestamp: new Date().getTime() - rand(100000, 100000000),
      mediaType,
      ...(['VIDEO', 'AUDIO'].includes(mediaType) && {
        mediaDuration: rand(10, 10000),
      }),
    };
  });
