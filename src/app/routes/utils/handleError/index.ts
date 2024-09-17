import { FetchError } from '#models/types/fetch';

const handleError = (message: string, status: number) => {
  const error = new Error(message) as FetchError;
  error.status = status;

  return error;
};

export default handleError;
