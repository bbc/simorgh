/**
 * When adding or updating values, please ensure that the relevant dashboards (e.g. Sumologic) are updated accordingly.
 */

const logCodes = {
  // Data fetch
  DATA_FETCH_ERROR: 'data_fetch_error',
  DATA_NOT_FOUND: 'data_response_404',
  DATA_REQUEST_RECEIVED: 'data_request_received',

  // Files
  LOCAL_SENDFILE_ERROR: 'local_sendfile_error',
  MANIFEST_SENDFILE_ERROR: 'server_sendfile_error_manifest',

  // Media
  NO_MEDIA_BLOCK: 'no_media_block',
  MEDIA_ASSET_REVOKED: 'media_asset_revoked',
  MEDIA_ASSET_EXPIRED: 'media_asset_expired',
  MEDIA_METADATA_UNAVAILABLE: 'media_metadata_unavailable',
  MEDIA_PLAYER_RESPONSE: 'media_player_response',

  // Translations
  NO_TRANSLATION_FOUND: 'no_translation_found',

  // Routing
  ROUTING_INFORMATION: 'routing_info',

  // Radio Schedule
  RADIO_SCHEDULE_FETCH_ERROR: 'radio_schedule_fetch_error',
  RADIO_SCHEDULE_REQUEST_RECEIVED: 'radio_schedule_request_received',
  RADIO_SCHEDULE_DATA_INCOMPLETE_ERROR: 'radio_schedule_data_incomplete_error',

  // Server Side
  SERVER_LISTEN_ERROR: 'server_listen_error',
  SERVER_RESPONSE_TIME: 'server_response_time',
  SERVER_SIDE_RENDER_REQUEST_RECEIVED: 'ssr_request_received',
  SERVER_SIDE_REQUEST_FAILED: 'ssr_request_failed',
  SERVICE_WORKER_SENDFILE_ERROR: 'server_sendfile_error_sw',

  // Block Types
  UNSUPPORTED_BLOCK_TYPE: 'unsupported_block_type',
};

module.exports = logCodes;
