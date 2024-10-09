import { UGCSendErrorResponse } from './types';

const UGCErrorPayload = {
  parseErrorPayload: (req: XMLHttpRequest): UGCSendErrorResponse => {
    const UNKNOWN_SUBMISSION_ERROR = {
      message: 'Unable to reach the pertinent service to submit data',
      code: 'UNKNOWN_SUBMISSION_ERROR',
    };

    const contentType = req.getResponseHeader('Content-Type');
    const isHTML = contentType?.match(/text\/html/);

    const { response, status } = req;
    const { message, code } =
      response && typeof response === 'object' && !isHTML
        ? response
        : UNKNOWN_SUBMISSION_ERROR;
    return { code, message, status };
  },
};

export default UGCErrorPayload;
