/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';

/* eslint-disable react/no-unknown-property */

const TestBox = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default TestBox;
