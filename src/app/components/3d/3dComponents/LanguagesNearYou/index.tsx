/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import Scene3D from './scene3d';
import { RequestContext } from '#contexts/RequestContext';
import config3d from '#app/components/3d/config3d.json';
import { use } from 'react';
import styles from './index.styles';

const LanguagesNearYou = () => {

  const { service } = use(RequestContext)
  const isEnabled = config3d.LanguagesNearYou.enabled.includes(service)

  if (!isEnabled) {
    return null;
  }

  return (
    <div>
      <h2>Languages Near You</h2>
      <div css={styles.scene3dContainer}>
        <Scene3D />
      </div>
      <p> link to other services </p>
    </div>
  );
};

export default LanguagesNearYou;
