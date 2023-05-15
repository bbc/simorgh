import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import Canonical from './Canonical';
import AmpMostRead from './Amp';
import {
  ColumnLayout,
  CPSMostReadRecord,
  OptimoMostReadRecord,
  Size,
} from './types';

const blockLevelEventTrackingData = {
  componentName: 'most-read',
};

const mostReadAmpPageTypes = ['STY', 'CSP', 'article'];

export interface InitialData {
  lastRecordTimeStamp: string;
  records: CPSMostReadRecord | OptimoMostReadRecord;
}
interface MostReadProps {
  initialData?: InitialData;
  columnLayout?: ColumnLayout;
  size?: Size;
  wrapper?: React.ElementType;
  serverRenderOnAmp?: boolean;
  endpoint?: string;
}

const MostRead = ({
  initialData,
  columnLayout = 'multiColumn',
  size = 'default',
  wrapper,
  serverRenderOnAmp = false,
  endpoint,
}: MostReadProps) => {
  const { isAmp, pageType } = useContext(RequestContext);
  const {
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadToggleEnabled = enabled && hasMostRead;

  // Do not render most read when a toggle is disabled
  if (!mostReadToggleEnabled) {
    return null;
  }

  // We render amp on ONLY STY, CSP and ARTICLE pages using amp-list.
  // We also want to render most read on AMP for the "/popular/read" pages
  if (isAmp && !serverRenderOnAmp && mostReadAmpPageTypes.includes(pageType)) {
    const mostReadUrl = `${process.env.SIMORGH_MOST_READ_CDN_URL}${endpoint}`;
    return <AmpMostRead endpoint={mostReadUrl} size={size} wrapper={wrapper} />;
  }

  return (
    <Canonical
      initialData={initialData as InitialData}
      wrapper={wrapper}
      columnLayout={columnLayout}
      size={size}
      eventTrackingData={blockLevelEventTrackingData}
    />
  );
};

export default MostRead;
