import React, {
  AnchorHTMLAttributes,
  Children,
  ReactElement,
  forwardRef,
} from 'react';
import { Services } from '#app/models/types/global';
import styles from './index.styles';

interface TopicTagProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  link: string;
}

interface TopicTagsProps {
  children?: ReactElement<TopicTagProps> | ReactElement<TopicTagProps>[];
  script: object;
  service: Services;
  tagBackgroundColour?: string;
}

export const TopicTag = forwardRef<HTMLAnchorElement, TopicTagProps>(
  ({ name, link, ...anchorProps }, ref) => (
    <a href={link} ref={ref} {...anchorProps}>
      {name}
    </a>
  ),
);

export const TopicTags = ({
  children,
  script,
  service,
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
    <ul
      role="list"
      data-service={service}
      data-script-present={Boolean(script)}
      css={styles.topicsList}
    >
      {topicTagChildren.map((child, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          css={styles.topicTagItem(tagBackgroundColour)}
          data-service={service}
          data-script-present={Boolean(script)}
        >
          {child}
        </li>
      ))}
    </ul>
  ) : (
    <div
      data-service={service}
      data-script-present={Boolean(script)}
      css={styles.singleContainer}
    >
      <div
        css={styles.topicTagItem(tagBackgroundColour)}
        data-service={service}
        data-script-present={Boolean(script)}
      >
        {topicTagChildren[0]}
      </div>
    </div>
  );
};

export default TopicTags;
