import { useState } from 'react';
import Scene3D from './scene3D';
import styles from './index.module.scss';

const Globe = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  return (
    <div className={styles.globeScene}>
      <Scene3D
        selectedRegionId={selectedRegionId}
        onSelectedRegion={setSelectedRegionId}
      />
    </div>
  );
};

export default Globe;
