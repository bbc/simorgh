import React, { forwardRef } from 'react';
import { LUNAR } from '#app/components/ThemeProvider/palette';
import { getBrevier } from '#psammead/gel-foundations/src/typography';

const MIN_TAG_HEIGHT = '2.75rem'; // 44px

const containerClasses = 'flex flex-wrap -mt-4 mb-0 -mx-2 p-0';

export const TopicTag = forwardRef(
  ({ name, link, ...staticComponentTrackers }, ref) => (
    <a href={link} ref={ref} {...staticComponentTrackers}>
      {name}
    </a>
  ),
);

export const TopicTags = ({
  children = [],
  script,
  service,
  tagBackgroundColour = LUNAR,
}) => {
  const hasMultipleChildren = children.length > 1;
  
  const itemClasses = `font-sans-regular text-gel-brevier break-words mt-4 mx-2
    inline-flex min-h-[${MIN_TAG_HEIGHT}] px-4 py-2 items-center
    bg-grey-7 dark:bg-grey-7 text-ebon dark:text-grey-2 no-underline
    hover:underline focus:underline visited:text-metal dark:visited:text-grey-2`;

  return hasMultipleChildren ? (
    <ul role="list" className={containerClasses}>
      {children.map((child, index) => {
        if (child.type !== TopicTag) return null;
        return (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={itemClasses}
          >
            {child}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className={containerClasses}>
      <div className={itemClasses}>
        {children.type === TopicTag && children}
      </div>
    </div>
  );
};
