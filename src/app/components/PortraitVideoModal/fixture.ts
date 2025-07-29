import { PortraitVideoModalProps } from '.';

const items = [
  {
    id: 'urn:bbc:pips:pid:p01wjx7v',
    title: '4 erros de quem estuda para concursos públicos',
    holdingImageURL:
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
    versionId: 'p01wjx7v',
    images: [
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8g.jpg',
        altText:
          'A sensação de não saber por onde começar, a falta de uma rotina',
      },
    ],
  },
  {
    id: 'urn:bbc:pips:pid:p01wjx5y',
    title: 'Europa se armando para guerra?',
    holdingImageURL:
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
    versionId: 'p01wjx5y',
    images: [
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8v.jpg',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
        altText: 'A Europa está em uma espécie de "corrida armamentista"',
      },
    ],
  },
  {
    id: 'urn:bbc:pips:pid:p01wjx4r',
    title: 'China: a Nova Rota da Seda',
    holdingImageURL:
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
    versionId: 'p01wjx4r',
    images: [
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx5j.jpg',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx5j.jpg',

        altText: 'A Nova Rota da Seda',
      },
    ],
  },
] as unknown as PortraitVideoModalProps['items'];

export default items;
