/**
 * When adding or updating values, please ensure that the relevant dashboards (e.g. Sumologic) are updated accordingly.
 */

const logCodes = {
  ANALYTICS_BEACON_ERROR: 'analytics_beacon_error',
  DATA_FETCH_ERROR: 'data_fetch_error',
  DATA_NOT_FOUND: 'data_response_404',
  DATA_REQUEST_RECEIVED: 'data_request_received',
  INCLUDE_FETCH_ERROR: 'include_fetch_error',
  LOCAL_SENDFILE_ERROR: 'local_sendfile_error',
  MANIFEST_SENDFILE_ERROR: 'server_sendfile_error_manifest',
  MPULSE_ERROR: 'mpulse_error',
  NO_MEDIA_BLOCK: 'no_media_block',
  NO_TRANSLATION_FOUND: 'no_translation_found',
  ROUTING_INFORMATION: 'routing_info',
  RADIO_SCHEDULE_FETCH_ERROR: 'radio_schedule_fetch_error',
  RADIO_SCHEDULE_REQUEST_RECEIVED: 'radio_schedule_request_received',
  SERVER_LISTEN_ERROR: 'server_listen_error',
  SERVER_RESPONSE_TIME: 'server_response_time',
  SERVER_SIDE_RENDER_REQUEST_RECEIVED: 'ssr_request_received',
  SERVER_SIDE_REQUEST_FAILED: 'ssr_request_failed',
  SERVICE_CONFIG_ERROR: 'service_config_error',
  SERVICE_WORKER_SENDFILE_ERROR: 'server_sendfile_error_sw',
  TOGGLE_FETCH_ERROR: 'toggle_fetch_error',
  UNSUPPORTED_BLOCK_TYPE: 'unsupported_block_type',
};

module.exports = logCodes;
