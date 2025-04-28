import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import {
  getAtiUrl,
  getAtUserId,
  getBrowserViewPort,
  getCurrentTime,
  getDestination,
  getDeviceLanguage,
  getEventInfo,
  getScreenInfo,
} from '..';
import { ComponentTrackingProps } from '../types';

export default ({
  pageIdentifier,
  producerId,
  platform,
  statsDestination,
  componentName,
  campaignID,
  format,
  type,
  advertiserID,
  url,
  detailedPlacement,
  experimentVariant,
  ampExperimentName,
  isStatic = false,
}: ComponentTrackingProps & {
  isStatic?: boolean;
}) => {
  // on AMP, variable substitutions are used in the value and they cannot be
  // encoded: https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md
  const disableEncodingDueToAmpSubstitution = platform === 'amp';

  const eventPublisher = type === 'view' ? 'ati' : 'atc';
  const eventTrackingBeaconValues = [
    {
      key: 's',
      description: 'destination',
      value: getDestination(platform, statsDestination),
      wrap: false,
      disableEncoding: disableEncodingDueToAmpSubstitution,
    },
    {
      key: 's2',
      description: 'producer',
      value: producerId,
      wrap: false,
    },
    {
      key: 'p',
      description: 'page identifier',
      value: pageIdentifier,
      wrap: false,
    },
    {
      key: eventPublisher,
      description: 'event publisher',
      value: getEventInfo({
        campaignID,
        componentName,
        format,
        pageIdentifier,
        advertiserID,
        url,
        detailedPlacement,
        experimentVariant,
      }),
      wrap: false,
      disableEncoding: true,
    },
    ...(isStatic
      ? []
      : [
          {
            key: 'idclient',
            description: 'at user id',
            value: getAtUserId(),
            wrap: false,
          },
          {
            key: 'hl',
            description: 'time',
            value: getCurrentTime(platform),
            wrap: false,
            disableEncoding: disableEncodingDueToAmpSubstitution,
          },
          {
            key: 're',
            description: 'browser/viewport resolution',
            value: getBrowserViewPort(platform),
            wrap: false,
            disableEncoding: disableEncodingDueToAmpSubstitution,
          },
          {
            key: 'r',
            description: 'screen resolution & colour depth',
            value: getScreenInfo(platform),
            wrap: false,
            disableEncoding: disableEncodingDueToAmpSubstitution,
          },
          {
            key: 'lng',
            description: 'device language',
            value: getDeviceLanguage(platform),
            wrap: false,
            disableEncoding: disableEncodingDueToAmpSubstitution,
          },
        ]),
    ...(experimentVariant
      ? [
          {
            key: 'mv_test',
            description: 'Top Bar OJs experiment',
            value: 'Top Bar OJs experiment',
            wrap: false,
            disableEncoding: true,
          },
          {
            key: 'mv_creation',
            description: 'Top Bar OJs variant',
            value: `${experimentVariant}`,
            wrap: false,
            disableEncoding: true,
          },
        ]
      : []),
    ...(ampExperimentName
      ? [
          {
            key: 'mv_test',
            description: 'AMP experiment project name',
            value: `Google Discover`,
            wrap: false,
            disableEncoding: true,
          },
          {
            key: 'mv_experiment_id',
            description: 'AMP experiment name',
            value: `${ampExperimentName}`,
            wrap: false,
            disableEncoding: true,
          },
          {
            key: 'mv_creation',
            description: 'AMP experiment variant name',
            value: `VARIANT(${ampExperimentName})`,
            wrap: false,
            disableEncoding: true,
          },
        ]
      : []),
  ];

  return `${getEnvConfig().SIMORGH_ATI_BASE_URL}${getAtiUrl(
    eventTrackingBeaconValues,
  )}&type=AT`;
};
