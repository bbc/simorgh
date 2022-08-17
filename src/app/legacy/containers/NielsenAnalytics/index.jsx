import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpNielsenAnalytics from './Amp';

const NielsenAnalytics = () => {
  const { service, isAmp, pathname } = useContext(RequestContext);

  // nielsenAnalytics toggle only set up as local toggle at the moment...
  const { enabled } = useToggle('nielsenAnalytics');

  if (!enabled || !isAmp) {
    return null;
  }

  // News and Sport only
  let apid;
  if (service === 'news') {
    apid = '474C2B0B-0C04-4182-BCFB-FC9469A48C9B';
  }
  if (service === 'sport') {
    apid = 'DC4AFDB2-B352-4D51-81EF-38BE41114F22';
  }
  if (!apid) {
    return null;
  }

  /*
  section var logic:
  1. strip .amp off the path
  2. capitalise the service and in the case of CPS articles the subsection (can't get this from Optimo yet)

  So for CPS articles:
  example path = /news/business-58007120.amp
  section = BBC News Business

  for Optimo articles:
  example path = /news/articles/c6v11qzyv8po.amp
  section = BBC News Business
   */

  const assetid = pathname.split('.')[0];
  const capitalise = word => {
    return `${word[0].toUpperCase()}${word.substr(1)}`;
  };
  let section = `BBC ${capitalise(service)}`;
  const sectionSplit = assetid.split('/');
  const lastSection = sectionSplit[sectionSplit.length - 1];
  if (lastSection.includes('-')) {
    // CPS
    const lastSectionSplit = lastSection.split('-');
    section = `${section} ${capitalise(lastSectionSplit[0])}`;
  }

  return <AmpNielsenAnalytics apid={apid} section={section} />;
};

export default NielsenAnalytics;
