import { UGCSendResponse } from './types';

export default class UGCSendError extends Error {
  readonly UNRECOVERABLE_UGC_SEND_ERROR_CODES = [
    'ERR_CAMPAIGN_CLOSED',
    'ERR_CAMPAIGN_NOT_FOUND',
    'ERR_MAXIMUM_SUBMISSIONS_REACHED',
    'ERR_PROFILES_NOT_SUPPORTED',
  ];

  code: string;

  status: number;

  isRecoverable: boolean;

  constructor({ message, code, status }: UGCSendResponse) {
    super(message);
    this.code = code;
    this.name = 'UGSSendError';
    this.status = status;
    this.isRecoverable = !this.#isUnrecoverableSubmissionError();
  }

  #isUnrecoverableSubmissionError() {
    return this.UNRECOVERABLE_UGC_SEND_ERROR_CODES.includes(this.code);
  }
}
