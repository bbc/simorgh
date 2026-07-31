import { use } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Globe } from '#app/components/3d/3dModels/Globe';
import getRegions from '#app/components/3d/3dComponents/Globe/regions';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.module.scss';

const Scene3D = () => {
  const { collapsibleNavigation } = use(ServiceContext);
  const regions = getRegions(collapsibleNavigation);

  return (
    <div className={styles.canvasContainer}>
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
        <OrbitControls enablePan={false} />
        <Globe position={[0, 0, 0]} regions={regions} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
