import { string, shape, arrayOf, number } from 'prop-types';

const radioSchedulesShape = arrayOf(
  shape({
    id: string,
    state: string,
    startTime: number,
    link: string,
    brandTitle: string,
    episodeTitle: string,
    summary: string,
    duration: string,
    durationLabel: string,
  }),
);

export default radioSchedulesShape;
