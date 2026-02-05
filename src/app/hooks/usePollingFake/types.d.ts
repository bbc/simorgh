/**
 * The return object from the `usePolling` hook.
 */
type PollingResult = {
  /*
   * Indicates if an update should happen.
   */
  forceUpdate: boolean;

  /**
   * Indicate that an update has happened.
   */
  updateFinished: () => void;

  /**
   * A function to stop polling.
   */
  stopPolling: () => void;

  /**
   * Function to stop polling if the given date time has passed.
   *
   * @param endTimeDate - Set a date time in microseconds, parsable date time string or `Date` instance. If not set, polling will not end.
   */
  stopPollingIfPageEnded: (endTimeDate?: number | string | Date) => void;

  /**
   * Function to stop polling if the feature flag was set to `false`.
   *
   * @param pollingEnabled - Set to `false` in order to stop polling.
   */
  stopPollingIfFeatureToggleOff: (pollingEnabled?: boolean) => void;

  /**
   * Indicates if polling for this page has ended.
   */
  pageHasEnded: boolean;
};

/**
 * A custom React hook called `usePolling` designed to handle polling functionality, where a component can periodically request updates or refresh data from a server.
 *
 * @param hasPolling - To determine whether polling should be enabled or not.
 * @returns A polling result object.
 */
declare const usePolling: (hasPolling: boolean) => PollingResult;
