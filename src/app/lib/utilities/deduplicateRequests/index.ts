const deduplicateRequests = <T>() => {
  const inFlightRequests = new Map<string, Promise<T>>();

  return (key: string, request: () => Promise<T>): Promise<T> => {
    const inFlightRequest = inFlightRequests.get(key);

    if (inFlightRequest) {
      return inFlightRequest;
    }

    const pendingRequest = request().finally(() => {
      inFlightRequests.delete(key);
    });

    inFlightRequests.set(key, pendingRequest);

    return pendingRequest;
  };
};

export default deduplicateRequests;
