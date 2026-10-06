export interface UasErrorBody {
  key?: string;
  message?: string;
}

class UasError extends Error {
  status: number;

  code?: string;

  serviceMessage?: string;

  constructor(status: number, body?: UasErrorBody) {
    super(`UAS request failed with status ${status}`);
    this.name = 'UasError';
    this.status = status;
    this.code = body?.key;
    this.serviceMessage = body?.message;
  }
}

export default UasError;
