import timemachine from 'timemachine';

timemachine.reset();

export const startTimeMachine = () => {
  timemachine.reset();
  timemachine.config({
    dateString: 'Friday, 9 August 2019 14:04:14',
    timestamp: 1565359454,
    tick: true,
  });
};

export const resetTimeMachine = () => {
  timemachine.reset();
};
