import processRadioSchedule, {
  getLink,
  getProgramState,
} from './processRadioSchedule';
import persianRadioScheduleData from '#data/persian/bbc_persian_radio/schedule.json';

const service = 'persian';
const program = {
  serviceId: 'bbc_dari_radio',
  episode: { pid: 'p07zbtbf' },
};

describe('getLink', () => {
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
    const startTime = Date.now() - 1000;
    const endTime = Date.now() + 1000;

    expect(getProgramState(currentTime, startTime, endTime)).toBe('live');
  });
  it('should return `onDemand` when currentTime is greater than endTime', () => {
    const currentTime = Date.now();
    const startTime = Date.now() - 500;
    const endTime = Date.now() - 1000;

    expect(getProgramState(currentTime, startTime, endTime)).toBe('onDemand');
  });
  it('should return `next` when startTime is greater than currentTime', () => {
    const currentTime = Date.now();
    const startTime = Date.now() + 1000;
    const endTime = Date.now() + 2000;

    expect(getProgramState(currentTime, startTime, endTime)).toBe('next');
  });
});

describe('processRadioSchedule', () => {
  // it('should return `live` when currentTime is greater than startTime but less than endTime', () => {
  //   const currentTime = Date.now();
  //   const startTime = Date.now() - 1000;
  //   const endTime = Date.now() + 1000;

  //   expect(getProgramState(currentTime, startTime, endTime)).toBe('live');
  // });
  processRadioSchedule(persianRadioScheduleData, service, Date.now());
  // console.log(programs);
});
