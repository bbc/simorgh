import fetch from 'cross-fetch';
import { useEffect, useState } from 'react';
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';
import {
  useNetworkStatus,
  useHardwareConcurrency,
  useMemoryStatus,
} from 'react-adaptive-hooks';
import useEvent from './use-event';

const noOp = () => {};

const webVitalsBase = {
  age: 0,
  type: 'web-vitals',
  url: 'current-page-url',
};

const vitals = { cls: null, fid: null, lcp: null, fcp: null, ttfb: null };
const deviceMetrics = {
  device_mem: null,
  device_cpu: null,
  device_effective_connection: null,
};

const updateWebVitals = ({ name, value }) => {
  const vitalName = name.toLowerCase();
  vitals[vitalName] = value;
};

const updateDeviceMetrics = ({
  deviceMemory,
  numberOfLogicalProcessors,
  effectiveConnectionType,
}) => {
  deviceMetrics.device_mem = deviceMemory;
  deviceMetrics.device_cpu = numberOfLogicalProcessors;
  deviceMetrics.device_effective_connection = effectiveConnectionType;
};

const setCurrentUrl = () => {
  webVitalsBase.url = window.location.href;
};

const appendReportParams = (reportingEndpoint, reportParams) => {
  const url = new URL(reportingEndpoint);
  const reportParamKeys = Object.keys(reportParams);
  const paramsString = reportParamKeys
    .map(param => `${param}=${reportParams[param]}`)
    .join('&');

  return url.search
    ? `${reportingEndpoint}&${paramsString}`
    : `${reportingEndpoint}?${paramsString}`;
};

const sendBeacon = (rawBeacon, reportingEndpoint, reportParams) => {
  const beacon = JSON.stringify(rawBeacon);
  const beaconTarget = reportParams
    ? appendReportParams(reportingEndpoint, reportParams)
    : reportingEndpoint;

  if (navigator.sendBeacon) {
    const headers = { type: 'application/reports+json' };
    const blob = new Blob([beacon], headers);
    return new Promise((resolve, reject) => {
      const beaconResult = navigator.sendBeacon(beaconTarget, blob);
      if (!beaconResult) reject(new Error('Send Beacon failed'));
      resolve();
    });
  }
  return fetch(beaconTarget, {
    method: 'POST',
    headers: { 'Content-Type': 'application/reports+json' },
    body: beacon,
    mode: 'no-cors',
  });
};

const shouldSample = sampleRate => {
  const randomNumber = Math.floor(Math.random() * 100);
  return randomNumber <= sampleRate;
};

const useWebVitals = ({
  enabled,
  reportingEndpoint,
  loggerCallback = noOp,
  sampleRate = 100,
  reportParams,
}) => {
  let pageLoadTime;
  const [status, setStatus] = useState({ error: false });
  const shouldSendVitals = enabled && shouldSample(sampleRate);

  const { effectiveConnectionType } = useNetworkStatus();
  const { numberOfLogicalProcessors } = useHardwareConcurrency();
  const { deviceMemory } = useMemoryStatus();

  const sendVitals = () => {
    const pageExitTime = Date.now();
    const pageAge = pageExitTime - pageLoadTime;

    // Last chance to get the CLS before sending the beacon.
    getCLS(updateWebVitals, true);

    const beacon = [
      { ...webVitalsBase, age: pageAge, body: { ...vitals, ...deviceMetrics } },
    ];

    sendBeacon(beacon, reportingEndpoint, reportParams).catch(loggerCallback);
  };

  useEvent('pagehide', shouldSendVitals ? sendVitals : noOp);

  useEffect(() => {
    try {
      pageLoadTime = Date.now();
      setCurrentUrl();
      updateDeviceMetrics({
        effectiveConnectionType,
        numberOfLogicalProcessors,
        deviceMemory,
      });
      getCLS(updateWebVitals, true); // Setting 'true' will report all CLS changes
      getFID(updateWebVitals);
      getLCP(updateWebVitals, true); // Setting 'true' will report all LCP changes
      getFCP(updateWebVitals);
      getTTFB(updateWebVitals);
    } catch ({ message }) {
      setStatus({ error: true, message });
    }
  }, []);

  return status;
};

export default useWebVitals;
