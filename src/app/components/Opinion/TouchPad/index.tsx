import React, { PropsWithChildren } from 'react';
import TouchPathList from './utils/TouchPathList';
import detectSwipeUp from './utils/detectSwipeUp';
import TouchPadContext from './TouchPadContext';

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
          detectSwipeUp(touchList.touchList);
          touchList.clearTouchPathList();
        }}
        style={{
          border: 'cyan solid 10px',
          height: '100%',
          position: 'absolute',
        }}
      >
        {children}
      </div>
    </TouchPadContext>
  );
};

export default TouchPad;
