import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import Canonical from './Canonical';
import Amp from './Amp';
import { ColumnLayout, Size, MostReadData } from './types';

const blockLevelEventTrackingData = {
  componentName: 'most-read',
};

const mostReadAmpPageTypes = ['STY', 'CSP', 'article', 'home'];

interface MostReadProps {
  data?: MostReadData;
  columnLayout?: ColumnLayout;
  size?: Size;
  wrapper?: React.ElementType;
  serverRenderOnAmp?: boolean;
  endpoint?: string;
}

const MostRead = ({
  data,
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
    return <Amp endpoint={mostReadUrl} size={size} wrapper={wrapper} />;
  }

  // Do not render the component on canonical if data is null
  if (!data) {
    return null;
  }

  return (
    <Canonical
      data={data}
      wrapper={wrapper}
      columnLayout={columnLayout}
      size={size}
      eventTrackingData={blockLevelEventTrackingData}
    />
  );
};

export default MostRead;
