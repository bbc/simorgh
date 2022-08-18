import persianRadioScheduleData from '#data/persian/bbc_persian_radio/schedule.json';
import { getIsProgramValid } from './evaluateScheduleData';

describe('evaluateScheduleData', () => {
  describe('isProgramValid', () => {
    const logFn = jest.fn();
    const isProgramValid = getIsProgramValid(logFn);

    it('should return false without important fields', () => {
      const program = persianRadioScheduleData.schedules[0];
      const { publishedTimeStart, ...noPublishedTimeStart } = program;
      const { publishedTimeEnd, ...noPublishedTimeEnd } = program;
      const { publishedTimeDuration, ...noPublishedTimeDuration } = program;

      const { brand, ...noBrand } = program;
      const { broadcast, ...noBroadcast } = program;
      const { episode, ...noEpisode } = program;

      const noBrandTitle = { ...noBrand };
      const { title, ...brandWithoutTitle } = brand;
      noBrandTitle.brand = brandWithoutTitle;

      const noBrandPid = { ...noBrand };
      const { pid: brandPid, ...brandWithoutPid } = brand;
      noBrandPid.brand = brandWithoutPid;

      const noBroadcastPid = noBroadcast;
      const { pid: broadcastPid, ...broadcastWithoutPid } = broadcast;
      noBroadcastPid.broadcast = broadcastWithoutPid;

      const noEpisodePid = noEpisode;
      const { pid: episodePid, ...episodeWithoutPid } = episode;
      noEpisodePid.episode = episodeWithoutPid;

      expect(isProgramValid(noPublishedTimeStart)).toBe(false);
      expect(isProgramValid(noPublishedTimeEnd)).toBe(false);
      expect(isProgramValid(noPublishedTimeDuration)).toBe(false);

      expect(isProgramValid(noBrandTitle)).toBe(false);
      expect(isProgramValid(noBrandPid)).toBe(false);
      expect(isProgramValid(noBroadcastPid)).toBe(false);
      expect(isProgramValid(noEpisodePid)).toBe(false);

      expect(logFn).toHaveBeenCalledTimes(7);
    });

    it('should return true when all important fields are present', () => {
      const program = {
        publishedTimeStart: 1584943200000,
        publishedTimeEnd: 1584944100000,
        publishedTimeDuration: 'PT15M',
        brand: {
          title: 'Le Journal',
          pid: 'p03p35rt',
        },
        episode: {
          pid: 'w172x5zpbbtl4wd',
        },
        broadcast: {
          pid: 'p086czts',
        },
      };

      expect(isProgramValid(program)).toBe(true);
    });
  });
});
