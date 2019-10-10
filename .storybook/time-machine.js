import timemachine from 'timemachine';

timemachine.reset();

export const startTimeMachine = (tick = true) => {
  timemachine.reset();
  timemachine.config({
    dateString: 'Friday, 9 August 2019 14:04:14 GMT',
    timestamp: 1565359454,
    tick,
  });
};

export const resetTimeMachine = () => {
  timemachine.reset();
};
