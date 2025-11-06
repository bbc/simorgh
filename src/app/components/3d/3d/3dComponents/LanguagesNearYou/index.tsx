/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { RequestContext } from '#contexts/RequestContext';
import config3d from '#app/components/3d/config3d.json';
import { use, useState, useEffect } from 'react';
import Text from '#app/components/Text';
import CoreIcons from '#app/legacy/psammead/psammead-assets/src/svgs/coreIcons';
import Scene3D from './scene3d';
import styles from './index.styles';

const LanguagesNearYou = () => {
  const { service } = use(RequestContext);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  useEffect(() => {
    console.log('hoveredService changed to:', hoveredService);
  }, [hoveredService]);
  const isEnabled = config3d.LanguagesNearYou.enabled.includes(service);

  if (!isEnabled) {
    return null;
  }

  return (
    <div>
      <Text
        as="h2"
        size="trafalgar"
        fontVariant="sansBold"
        css={styles.textHeading}
      >
        Languages Near You
      </Text>
      <div css={styles.scene3dContainer}>
        <Scene3D onServiceHover={setHoveredService} />
        <div css={styles.infoBox}>
          <div css={styles.infoIcon}>{CoreIcons.info}</div>
          <Text size="pica" fontVariant="sansRegular" css={{ color: 'white' }}>
            {hoveredService
              ? `Vist: bbc.com/${hoveredService.charAt(0).toUpperCase()}${hoveredService.slice(1)}`
              : 'Click on regions to explore different language services!'}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LanguagesNearYou;
