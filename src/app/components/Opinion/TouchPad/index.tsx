/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import TouchPathList from './utils/TouchPathList';
import TouchPadContext from './TouchPadContext';
import styles from './index.style';

const TouchPad = ({ children }: PropsWithChildren) => {
  const touchList = new TouchPathList();

  return (
    <TouchPadContext>
      <div
        onTouchStart={e => {
          touchList.initialiseTouchPathList(e);
        }}
        onTouchEnd={e => {
          touchList.updateTouchPathList(e);
          touchList.processTouches();
          touchList.clearTouchPathList();
        }}
        css={styles.touchPadArea}
      >
        {children}
      </div>
    </TouchPadContext>
  );
};

export default TouchPad;
