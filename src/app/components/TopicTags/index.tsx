import React, {
  AnchorHTMLAttributes,
  Children,
  ReactElement,
  PropsWithChildren,
  Ref,
} from 'react';
import styles from './index.styles';

interface TopicTagProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  link: string;
  ref?: Ref<HTMLAnchorElement>;
}

interface TopicTagsProps
  extends PropsWithChildren<{
    tagBackgroundColour?: string;
  }> {}

export const TopicTag = ({
  name,
  link,
  ref,
  ...anchorProps
}: TopicTagProps) => (
  <a href={link} ref={ref} {...anchorProps}>
    {name}
  </a>
);

export const TopicTags = ({
  children,
  tagBackgroundColour,
}: TopicTagsProps) => {
  const topicTagChildren = Children.toArray(children).filter(
    (child): child is ReactElement<TopicTagProps> =>
      React.isValidElement(child) && child.type === TopicTag,
  );

  if (topicTagChildren.length === 0) {
    return null;
  }

  const hasMultipleChildren = topicTagChildren.length > 1;

  return hasMultipleChildren ? (
    <ul role="list" css={styles.topicsList}>
      {topicTagChildren.map((child, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          css={styles.topicTagItem(tagBackgroundColour)}
        >
          {child}
        </li>
      ))}
    </ul>
  ) : (
    <div css={styles.singleContainer}>
      <div css={styles.topicTagItem(tagBackgroundColour)}>
        {topicTagChildren[0]}
      </div>
    </div>
  );
};

export default TopicTags;
