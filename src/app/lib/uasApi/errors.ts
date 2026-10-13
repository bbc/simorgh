export interface UasErrorBody {
  key?: string;
  message?: string;
  errors?: { code?: string; description?: string }[];
}

class UasError extends Error {
  status: number;

  code?: string;

  serviceMessage?: string;

  constructor(status: number, body?: UasErrorBody) {
    super(`UAS request failed with status ${status}`);
    this.name = 'UasError';
    this.status = status;

    // Validation/auth errors (400/401) nest code & description inside errors[0]
    const [firstError] = body?.errors ?? [];
    this.code = body?.key ?? firstError?.code;
    this.serviceMessage = body?.message ?? firstError?.description;
  }
}

export default UasError;
