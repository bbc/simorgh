/* eslint-disable camelcase */
import type { OEmbedProps } from '../types';
import style from './index.styles';

export default ({ oembed }: OEmbedProps) => {
  const { url, iFrameTitle, riddleId } = oembed;

  if (!url) {
    return null;
  }

  return (
    <div
      className="riddle2-wrapper"
      data-rid-id={riddleId}
      data-auto-scroll="true"
      data-is-fixed-height-enabled="false"
      css={style.iframe}
    >
      <iframe
        title={iFrameTitle}
        src={url}
        allow="autoplay"
        referrerPolicy="strict-origin"
      />
    </div>
  );
};
