import { PortraitVideoModalProps } from '.';

const blocks = [
  {
    type: 'portraitClipMedia',
    model: {
      type: 'video',
      images: [
        {
          source: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg',
          urlTemplate:
            'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8g.jpg',
        },
      ],
      video: {
        id: 'urn:bbc:pips:pid:p01wjx7v',
        title: '4 erros de quem estuda para concursos públicos',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
        version: {
          id: 'p01wjx7v',
          duration: 'PT2M30S',
          kind: 'program',
          guidance: null,
          territories: ['GB'],
        },
        isEmbeddingAllowed: true,
      },
    },
  },
  {
    type: 'portraitClipMedia',
    model: {
      type: 'video',
      images: [
        {
          source: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8v.jpg',
          urlTemplate:
            'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
        },
      ],
      video: {
        id: 'urn:bbc:pips:pid:p01wjx5y',
        title: 'Europa se armando para guerra?',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
        version: {
          id: 'p01wjx5y',
          duration: 'PT2M45S',
          kind: 'program',
          guidance: null,
          territories: ['GB'],
        },
        isEmbeddingAllowed: true,
      },
    },
  },
  {
    type: 'portraitClipMedia',
    model: {
      type: 'video',
      images: [
        {
          source: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx5j.jpg',
          urlTemplate:
            'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx5j.jpg',
        },
      ],
      video: {
        id: 'urn:bbc:pips:pid:p01wjx4r',
        title: 'China: a Nova Rota da Seda',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01wjx8v.jpg',
        version: {
          id: 'p01wjx4r',
          duration: 'PT3M10S',
          kind: 'program',
          guidance: null,
          territories: ['GB'],
        },
        isEmbeddingAllowed: true,
      },
    },
  },
] as unknown as PortraitVideoModalProps['blocks'];

export default blocks;
