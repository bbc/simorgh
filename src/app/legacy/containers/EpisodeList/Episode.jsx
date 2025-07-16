import React, { Children, cloneElement, forwardRef } from 'react';
import tail from 'ramda/src/tail';
import pathOr from 'ramda/src/pathOr';
import Image from './Image';
import { withEpisodeContext } from './helpers';

const Episode = forwardRef(({ children, dir }, ref) => {
  const showMediaIndicator = pathOr({}, '0', children).type !== Image;

  return (
    <div
      dir={dir}
      className={`relative ${
        showMediaIndicator ? (dir === 'ltr' ? 'pl-16' : 'pr-16') : ''
      }`}
      {...ref}
    >
      {showMediaIndicator ? (
        Children.toArray(children)
          .filter(Boolean)
          .map(child => cloneElement(child, { showMediaIndicator }))
      ) : (
        <>
          {cloneElement(children[0], { dir })}
          <div className="inline-block max-w-[calc(100%-4.375rem-2rem)] align-top group-2:max-w-[calc(100%-7.5rem-2rem)] group-3:max-w-[calc(100%-14.375rem-2rem)]">
            {tail(children)}
          </div>
        </>
      )}
    </div>
  );
});

export default withEpisodeContext(Episode);
