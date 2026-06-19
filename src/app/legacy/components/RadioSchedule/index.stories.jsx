import { renderRadioSchedule as Component } from './testHelpers/helper';

export default {
  title: 'Components/Radio Schedule',
  Component,
};

export const RadioSchedule = (_, globalArgs) => {
  const { service, dir, timezone } = globalArgs;
  return <Component service={service} dir={dir} timezone={timezone} />;
};

export const ScheduleDifferentHeights = (_, globalArgs) => {
  const { service, dir, timezone } = globalArgs;
  return (
    <Component
      service={service}
      dir={dir}
      timezone={timezone}
      withLongSummary
    />
  );
};
