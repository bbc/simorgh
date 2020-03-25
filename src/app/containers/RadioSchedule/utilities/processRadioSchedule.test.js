import { getLink } from './processRadioSchedule';

const program = {
  serviceId: 'bbc_dari_radio',
  broadcast: { pid: 'p07zbtbf' },
};
const service = 'persian';

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
