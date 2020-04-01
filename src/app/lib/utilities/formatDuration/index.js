/* eslint-disable prefer-template */
export const lpad = (s) => s.toString().padStart(2, '0');
// the duration argument should be a moment duration!
const formatDuration = ({ duration, separator = ':', padMinutes = false }) => {
  const isOverAnHour = duration.asHours() >= 1;

  let formatedDuration = '';

  if (isOverAnHour) {
    formatedDuration += Math.floor(duration.asHours()) + separator;
  }

  formatedDuration +=
    isOverAnHour || padMinutes ? lpad(duration.minutes()) : duration.minutes();

  formatedDuration += separator;
  formatedDuration += lpad(duration.seconds());

  return formatedDuration;
};

export default formatDuration;
