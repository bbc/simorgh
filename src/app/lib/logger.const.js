/**
 * When adding or updating values, please ensure that the relevant dashboards (e.g. Sumologic) are updated accordingly.
 */

const logCodes = {
  // Application Start
  CLUSTER_PROCESS_START: 'cluster_process_started',
  CLUSTER_PROCESS_EXIT: 'cluster_process_exit',

  // Data fetch
  DATA_FETCH_RESPONSE_TIME: 'data_fetch_response_time',
  DATA_FETCH_ERROR: 'data_fetch_error',
  DATA_FETCH_ERROR_SECONDARY_COLUMN: 'data_fetch_error_secondary_column',
  DATA_NOT_FOUND: 'data_response_404',
  DATA_REQUEST_RECEIVED: 'data_request_received',
  DATA_RESPONSE_FROM_CACHE: 'data_response_from_cache',
  BFF_FETCH_ERROR: 'bff_fetch_error',

  // Files
  LOCAL_SENDFILE_ERROR: 'local_sendfile_error',
  MANIFEST_SENDFILE_ERROR: 'server_sendfile_error_manifest',

  // Media
  NO_MEDIA_BLOCK: 'no_media_block',
  MEDIA_ASSET_REVOKED: 'media_asset_revoked',
  MEDIA_ASSET_EXPIRED: 'media_asset_expired',
  MEDIA_METADATA_UNAVAILABLE: 'media_metadata_unavailable',
  MEDIA_MISSING: 'media_missing',
  MEDIA_MISSING_FIELD: 'media_missing_field',
  MEDIA_PLAYER_STATUS: 'media_player_status',
  RADIO_MISSING_FIELD: 'radio_missing_field',
  PODCAST_MISSING_FIELD: 'podcast_missing_field',
  EPISODE_EXPIRED: 'episode_expired',
  EPISODE_NOT_YET_AVAILABLE: 'episode_not_yet_available',
  UNRECOGNISED_EPISODE_AVAILABILITY: 'unrecognised_episode_availability',

  PODCAST_SERVICE_MISSING: 'podcast_service_missing',

  // Translations
  NO_TRANSLATION_FOUND: 'no_translation_found',

  // Routing
  ROUTING_INFORMATION: 'routing_info',

  // Radio Schedule
  RADIO_SCHEDULE_FETCH_ERROR: 'radio_schedule_fetch_error',
  RADIO_SCHEDULE_DATA_INCOMPLETE_ERROR: 'radio_schedule_data_incomplete_error',

  // Server Side
  SERVER_LISTEN_ERROR: 'server_listen_error',
  SERVER_RESPONSE_TIME: 'server_response_time',
  SERVER_SIDE_RENDER_REQUEST_RECEIVED: 'ssr_request_received',
  SERVER_SIDE_REQUEST_FAILED: 'ssr_request_failed',
  SERVICE_WORKER_SENDFILE_ERROR: 'server_sendfile_error_sw',
  SERVER_STATUS_ENDPOINT_ERROR: 'server_status_endpoint_error',
  SLOW_SERVER_RESPONSE_TIME: 'slow_server_response_time',

  // Config
  CONFIG_REQUEST_RECEIVED: 'config_request_received',
  CONFIG_FETCH_ERROR: 'config_fetch_error',
  CONFIG_ERROR: 'config_error',
  CONFIG_RESPONSE_EMPTY_ERROR: 'config_response_empty_error',

  // Block Types
  UNSUPPORTED_BLOCK_TYPE: 'unsupported_block_type',
  GIST_TRANSFORMATION_FAILED: 'gist_transformation_failed',

  // Byline
  BYLINE_TRANSFORMATION_FAILED: 'byline_transformation_failed',

  // Most Read
  MOST_READ_FETCH_ERROR: 'most_read_fetch_error',
  MOST_READ_CLIENT_REQUEST: 'most_read_client_request',
  MOST_READ_DATA_INCOMPLETE: 'most_read_data_incomplete',
  MOST_READ_STALE_DATA: 'most_read_stale_data',

  // Include
  INCLUDE_ERROR: 'include_error',
  INCLUDE_FETCH_ERROR: 'include_fetch_error',
  INCLUDE_MISSING_URL: 'include_missing_url',
  INCLUDE_UNSUPPORTED: 'include_unsupported',

  // Toggle API
  TOGGLE_API_RESPONSE_TIME: 'toggle_api_response_time',

  // Recommendations
  RECOMMENDATIONS_MISSING_DATA: 'recommendations_missing_data',

  // Logging
  ATI_LOGGING_ERROR: 'ati_logging_error',
};

module.exports = logCodes;
