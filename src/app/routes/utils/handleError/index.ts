interface BFFError extends Error {
  status: number;
}

const handleError = (message: string, status: number) => {
  const error = new Error(message) as BFFError;
  error.status = status;

  return error;
};

export default handleError;
