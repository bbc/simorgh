import timemachine from 'timemachine';
/*
timemachine is a node module which overrides the system time for a repo.
There are components on storybook with date and time which varies according to current date and time.
This causes inconsistency across chromatic-qa tests hence the use of this dependency.
*/

// Resets the bindings so that the time is reset to the actual system time
export const resetTimeMachine = () => {
  timemachine.reset();
};

resetTimeMachine();

// Sets the date and time whilst leaving the clock ticking from that point onwards.
export const startTimeMachine = (tick = true) => {
  timemachine.config({
    dateString: 'Friday, 9 August 2019 14:04:14 GMT',
    timestamp: 1565359454,
    tick,
  });
};

