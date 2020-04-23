/**
 * When adding or updating values, please ensure that the relevant dashboards (e.g. Sumologic) are updated accordingly.
 */

const logCodes = {
  DATA_FETCH_ERROR: 'data_fetch_error',
  DATA_NOT_FOUND: 'data_response_404',
  DATA_REQUEST_RECEIVED: 'data_request_received',
  LOCAL_SENDFILE_ERROR: 'local_sendfile_error',
  MANIFEST_SENDFILE_ERROR: 'server_sendfile_error_manifest',
  NO_MEDIA_BLOCK: 'no_media_block',
  NO_TRANSLATION_FOUND: 'no_translation_found',
  ROUTING_INFORMATION: 'routing_info',
  RADIO_SCHEDULE_FETCH_ERROR: 'radio_schedule_fetch_error',
  RADIO_SCHEDULE_REQUEST_RECEIVED: 'radio_schedule_request_received',
  SERVER_LISTEN_ERROR: 'server_listen_error',
  SERVER_RESPONSE_TIME: 'server_response_time',
  SERVER_SIDE_RENDER_REQUEST_RECEIVED: 'ssr_request_received',
  SERVER_SIDE_REQUEST_FAILED: 'ssr_request_failed',
  SERVICE_WORKER_SENDFILE_ERROR: 'server_sendfile_error_sw',
  UNSUPPORTED_BLOCK_TYPE: 'unsupported_block_type',
};

module.exports = logCodes;
