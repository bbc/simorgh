import usePrevious from '../usePrevious';

const usePreviousPath = location => {
  const currentPreviousPath = usePrevious(location.pathname);
  const oldPreviousPath = usePrevious(currentPreviousPath);

  // set to null on back clicks
  return location.pathname === oldPreviousPath ? null : currentPreviousPath;
};

export default usePreviousPath;
