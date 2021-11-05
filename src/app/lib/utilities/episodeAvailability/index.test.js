import assocPath from 'ramda/src/assocPath';
import pipe from 'ramda/src/pipe';
import loggerMock from '#testHelpers/loggerMock';
import {
  EPISODE_EXPIRED,
  EPISODE_NOT_YET_AVAILABLE,
  UNRECOGNISED_EPISODE_AVAILABILITY,
} from '#lib/logger.const';
import getEpisodeAvailability, { getUrl } from '.';
import onDemandRadioEpisodeJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import onDemandRadioBrandJson from '#data/indonesia/bbc_indonesian_radio/w13xtt0s';
import onDemandTvEpisodeJson from '#data/afrique/bbc_afrique_tv/tv/w3ct05mp';
import onDemandTvBrandJson from '#data/somali/bbc_somali_tv/tv_programmes/w13xttqt';

describe('Episode Availability', () => {
  describe('getUrl', () => {
    it('should return a valid url for radio episode page', () => {
      const url = getUrl(onDemandRadioEpisodeJson);
      expect(url).toEqual('pashto/bbc_pashto_radio/w3ct0lz1');
    });

    it('should return a valid url for radio brand page', () => {
      const url = getUrl(onDemandRadioBrandJson);
      expect(url).toEqual('indonesia/bbc_indonesian_radio/programmes/w13xtt0s');
    });

    it('should return a valid url for tv episode page', () => {
      const url = getUrl(onDemandTvEpisodeJson);
      expect(url).toEqual('afrique/bbc_afrique_tv/tv/w3ct05mp');
    });

    it('should return a valid url for tv brand page', () => {
      const url = getUrl(onDemandTvBrandJson);
      expect(url).toEqual('somali/bbc_somali_tv/tv_programmes/w13xttqt');
    });
  });

  describe('getEpisodeAvailability', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const testAvailability = pipe(
      availability =>
        assocPath(
          ['content', 'blocks', '0', 'availability'],
          availability,
          onDemandRadioEpisodeJson,
        ),
      getEpisodeAvailability,
    );

    describe('episode has availability: available', () => {
      expect(testAvailability('available')).toEqual('available');
    });

    describe('episode has availability: notAvailable', () => {
      expect(testAvailability('notAvailable')).toEqual('expired');
      expect(loggerMock.info).toHaveBeenCalledWith(EPISODE_EXPIRED, {
        url: 'pashto/bbc_pashto_radio/w3ct0lz1',
        availability: 'notAvailable',
      });
    });

    describe('episode has availability: pending', () => {
      expect(testAvailability('pending')).toEqual('not-yet-available');
      expect(loggerMock.info).toHaveBeenCalledWith(EPISODE_NOT_YET_AVAILABLE, {
        url: 'pashto/bbc_pashto_radio/w3ct0lz1',
        availability: 'pending',
      });
    });

    describe('episode has availability: future', () => {
      expect(testAvailability('future')).toEqual('not-yet-available');
      expect(loggerMock.info).toHaveBeenCalledWith(EPISODE_NOT_YET_AVAILABLE, {
        url: 'pashto/bbc_pashto_radio/w3ct0lz1',
        availability: 'future',
      });
    });

    describe('episode has availability: junk-value', () => {
      expect(testAvailability('junk-value')).toEqual('expired');
      expect(loggerMock.error).toHaveBeenCalledWith(
        UNRECOGNISED_EPISODE_AVAILABILITY,
        {
          url: 'pashto/bbc_pashto_radio/w3ct0lz1',
          availability: 'junk-value',
        },
      );
    });

    describe('episode has availability: null', () => {
      expect(testAvailability(null)).toEqual('expired');
      expect(loggerMock.error).toHaveBeenCalledWith(
        UNRECOGNISED_EPISODE_AVAILABILITY,
        {
          url: 'pashto/bbc_pashto_radio/w3ct0lz1',
          availability: null,
        },
      );
    });
  });
});
