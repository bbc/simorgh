import processRadioSchedule, {
  getLink,
  getProgramState,
} from './processRadioSchedule';
import persianRadioScheduleData from '#data/persian/bbc_persian_radio/schedule.json';

describe('getLink', () => {
  let program;
  let service;

  beforeAll(() => {
    service = 'persian';
    program = {
      ...persianRadioScheduleData.schedules[0],
      serviceId: 'bbc_dari_radio',
      episode: { pid: 'p07zbtbf' },
    };
  });
  it('should return liveradio link when state is live', () => {
    expect(getLink('live', program, service)).toBe(
      '/persian/bbc_dari_radio/liveradio',
    );
  });
  it('should return program link when state is not live', () => {
    expect(getLink('anyotherstate', program, service)).toBe(
      '/persian/bbc_dari_radio/p07zbtbf',
    );
  });
});

describe('getProgramState', () => {
  it('should return `live` when currentTime is greater than startTime but less than endTime', () => {
    const currentTime = Date.now();
    const startTime = currentTime - 1000;
    const endTime = currentTime + 1000;

    expect(getProgramState(currentTime, startTime, endTime)).toBe('live');
  });
  it('should return `onDemand` when currentTime is greater than endTime', () => {
    const currentTime = Date.now();
    const startTime = currentTime - 1000;
    const endTime = currentTime - 500;

    expect(getProgramState(currentTime, startTime, endTime)).toBe('onDemand');
  });
  it('should return `next` when startTime is greater than currentTime', () => {
    const currentTime = Date.now();
    const startTime = currentTime + 1000;
    const endTime = currentTime + 2000;

    expect(getProgramState(currentTime, startTime, endTime)).toBe('next');
  });
});

describe('processRadioSchedule', () => {
  let programs;
  const service = 'persian';
  describe('Complete schedule data', () => {
    beforeAll(() => {
      programs = processRadioSchedule(
        persianRadioScheduleData,
        service,
        Date.now(),
      );
    });

    it('should return an array of four programs', () => {
      expect(programs).toHaveLength(4);
    });

    it('should return programs in the right order', () => {
      // Checks the order of live and onDemand programs
      expect(programs[0].startTime).toBeGreaterThan(programs[1].startTime);
      expect(programs[1].startTime).toBeGreaterThan(programs[2].startTime);
      // Checks that the next program is last item on the array
      expect(programs[3].startTime).toBeGreaterThan(programs[0].startTime);
    });

    it('should return a program that has the right fields', () => {
      programs.forEach(program => {
        expect(program).toHaveProperty('id');
        expect(program).toHaveProperty('state');
        expect(program).toHaveProperty('startTime');
        expect(program).toHaveProperty('link');
        expect(program).toHaveProperty('brandTitle');
        expect(program).toHaveProperty('summary');
        expect(program).toHaveProperty('duration');
        expect(program).toHaveProperty('durationLabel');
      });
    });
  });

  describe('Incomplete schedule data', () => {
    // Reduce the number of schedules to less than 4
    beforeEach(() => {
      persianRadioScheduleData.schedules.splice(
        3,
        persianRadioScheduleData.schedules.length - 1,
      );
      programs = processRadioSchedule(
        persianRadioScheduleData,
        service,
        Date.now(),
      );
    });

    it('should return undefined when schedule data is incomplete', () => {
      expect(programs).toBeUndefined();
    });
  });
});
