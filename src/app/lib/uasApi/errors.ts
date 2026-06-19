class UasError extends Error {
  status: number;

  constructor(status: number) {
    super(`UAS request failed with status ${status}`);
    this.name = 'UasError';
    this.status = status;
  }
}

export default UasError;
