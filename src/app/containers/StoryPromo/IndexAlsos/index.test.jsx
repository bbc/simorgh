import React from 'react';
import { shouldShallowMatchSnapshot } from '../../../../testHelpers';
import IndexAlsos from '.';

const relatedItems = [
  {
    headlines: {
      headline: 'APC ba ta isa ta kore ni ba – Buba Galadima',
    },
    locators: {
      assetUri: '/hausa/labarai-48916590',
      cpsUrn: 'urn:bbc:content:assetUri:/hausa/labarai-48916590',
    },
    summary:
      "Buba Galadima ya ce kasancewar yana daya daga cikin mutanen da suka kafa jam'iyya mai mulki ta APC, hakan ya mayar da shi dan jam'iyya na din-din-din.",
    timestamp: 1562665827,
    cpsType: 'MAP',
    mediaType: 'Video',
    id: 'urn:bbc:ares::asset:hausa/labarai-48916590',
    type: 'cps',
  },
  {
    headlines: {
      headline: 'Yaushe Obasanjo ya fara yi wa shugabannin kasa baki?',
    },
    locators: {
      assetUri: '/hausa/labarai-42837051',
      cpsUrn: 'urn:bbc:content:assetUri:/hausa/labarai-42837051',
    },
    summary:
      'Cif Obasanjo ya caccaki kusan daukacin mutanen da suka yi shugabancin Najeriya saboda abin da ya kira rashin iya gudanar da mulkinsu.',
    timestamp: 1563269515,
    cpsType: 'STY',
    id: 'urn:bbc:ares::asset:hausa/labarai-42837051',
    type: 'cps',
  },
];

const mockServiceConfig = {
  translations: {
    media: {
      audio: 'AUDIO',
      video: 'VIDEO',
      photogallery: 'PHOTOGALLERY',
    },
  },
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});
const { useContext } = jest.requireMock('react');

describe('Index Alsos', () => {
  beforeEach(() => {
    useContext.mockReturnValue(mockServiceConfig);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  shouldShallowMatchSnapshot(
    'should render multiple correctly',
    <IndexAlsos alsoItems={relatedItems} script="hausa" service="news" />,
  );
});
