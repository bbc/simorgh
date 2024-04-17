import { string, shape, arrayOf, number, oneOfType } from 'prop-types';

const radioSchedulesShape = arrayOf(
  shape({
    id: string.isRequired,
    state: string.isRequired,
    startTime: oneOfType([number, string]).isRequired,
    link: string.isRequired,
    brandTitle: string.isRequired,
    summary: string,
    duration: string.isRequired,
  }),
);

export default radioSchedulesShape;
