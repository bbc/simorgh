import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Globe } from '#app/components/3d/3dModels/Globe';
import styles from './index.styles';

const Scene3D = () => (
  <div css={styles.canvasContainer}>
    <Canvas>
      <OrbitControls />
      <Globe position={[0, 0, 0]} />
    </Canvas>
  </div>
);

export default Scene3D;
