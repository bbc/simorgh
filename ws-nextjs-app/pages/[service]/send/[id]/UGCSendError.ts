import { UGCSendResponse } from './types';

export default class UGCSendError extends Error {
  code: string;

  status: number;

  constructor({ message, code, status }: UGCSendResponse) {
    super(message);
    this.code = code;
    this.name = 'UGSSendError';
    this.status = status;
  }
}
