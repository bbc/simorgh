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
  new Array(23).fill().map((_, id) => ({
    id,
    heading: fixtureHeading(),
    footer: '8th February 2022',
    href: '#',
    imageSrc: fixtureCat(),
    imageAlt: 'evil monster',
  }));
