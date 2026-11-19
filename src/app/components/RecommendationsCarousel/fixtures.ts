import articleData from '#data/mundo/articles/c1xv2q1gewvo.json';
import additionalArticleData from '#data/mundo/articles/cddylv9g8z0o.json';
import type { RecommendationsCarouselProps } from '.';

const articleRecommendations = [articleData, additionalArticleData].flatMap(
  ({ data }) =>
    data.article.content.model.blocks.flatMap(({ type, model }) =>
      type === 'wsoj' && 'data' in model ? (model.data ?? []) : [],
    ),
);

const recommendationsCarouselFixture: RecommendationsCarouselProps['data'] = [
  ...articleRecommendations,
  {
    id: 'urn:bbc:optimo:asset:cd6j9y63lwqo',
    title:
      'La familia que lo dejó todo para recorrer Colombia casi sin dinero durante más de 3 años (y qué lecciones aprendió)',
    href: 'https://www.bbc.com/mundo/articles/cd6j9y63lwqo',
    image: {
      width: 1967,
      height: 1106,
      locator: '8a58/live/d39f4e70-2511-11f0-a238-dbb134718598.jpg',
      originCode: 'cpsprodpb',
      copyrightHolder: 'Familia Valderrama-Casallas',
      altText: 'Los Valderrama-Casallas, durante sus viajes por Colombia.',
    },
  },
  {
    id: 'urn:bbc:optimo:asset:cvg7gr95pngo',
    title:
      '"Canadá nunca estará en venta": el primer ministro Mark Carney rechaza con firmeza en su primer encuentro con Trump la idea de que su país sea el estado 51 de EE.UU.',
    href: 'https://www.bbc.com/mundo/articles/cvg7gr95pngo',
    image: {
      width: 880,
      height: 495,
      locator: 'dd75/live/416dd800-2acf-11f0-81a5-2fe9d0d01990.jpg',
      originCode: 'cpsprodpb',
      copyrightHolder: 'Getty Images',
      altText: 'Donald Trump y Mark Carney',
    },
  },
  {
    id: 'urn:bbc:optimo:asset:cvgny75lzj2o',
    title:
      'El gran desafío de Xi Jinping para lograr "su sueño de una China rejuvenecida"',
    href: 'https://www.bbc.com/mundo/articles/cvgny75lzj2o',
    image: {
      width: 931,
      height: 524,
      locator: '7b67/live/841a71a0-275e-11f0-a2c4-bb5d0d7066c6.jpg',
      originCode: 'cpsprodpb',
      copyrightHolder: 'Getty Images',
      altText: 'Xi Jinping',
    },
  },
  {
    id: 'urn:bbc:optimo:asset:cvgp0exmlxmo',
    title:
      '5 cosas que quizás no sabías de la Capilla Sixtina, sede del cónclave para elegir al nuevo Papa',
    href: 'https://www.bbc.com/mundo/articles/cvgp0exmlxmo',
    image: {
      width: 1024,
      height: 574,
      locator: '3be6/live/87d0fe10-276b-11f0-b26b-ab62c890638b.jpg',
      originCode: 'cpsprodpb',
      copyrightHolder: 'Getty Images',
      altText: '"La creación de Adán" en el Techo Sixtino',
    },
  },
];

export default recommendationsCarouselFixture;
