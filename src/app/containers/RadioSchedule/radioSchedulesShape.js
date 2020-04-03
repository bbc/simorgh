import { string, shape, arrayOf, number } from 'prop-types';

const radioSchedulesShape = shape({
  schedules: arrayOf(
    shape({
      publishedTimeStart: number,
      publishedTimeEnd: number,
      publishedTimeDuration: string,
      serviceId: string,
      episode: shape({
        pid: string,
        presentationTitle: string,
        synopses: shape({
          short: string,
        }),
      }),
      broadcast: shape({ pid: string }),
      brand: shape({ title: string }),
    }),
  ),
});

export default radioSchedulesShape;
