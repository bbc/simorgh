/** @jsx jsx */
import { jsx } from '@emotion/react';
import Text from '../../../Text';
import style from './index.styles';

export default ({
  as,
  label,
  content,
}: {
  as?: string;
  label: string;
  content: string;
}) => {
  return (
    <div css={style.detailContainer}>
      <Text css={style.detailLabel}>{label}</Text>
      <div>
        <Text {...(as && { as })} css={style.detailContent}>
          {content}
        </Text>
      </div>
    </div>
  );
};
