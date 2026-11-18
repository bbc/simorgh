import { use, useEffect, useId, useMemo, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { RequestContext } from '#app/contexts/RequestContext';
import MediaLoader, { BumpLoader } from '#app/components/MediaLoader';
import {
  AresMediaMetadataBlock,
  MediaBlock,
} from '#app/components/MediaLoader/types';
import getMediaOrientation from '#app/components/MediaLoader/utils/getMediaOrientation';

type Props = {
  mediaBlock: MediaBlock;
  className?: string;
  loadingMessage?: string;
  unavailableMessage?: string;
};

const containerStyles = ({ palette }: Theme) =>
  css({
    display: 'grid',
    placeItems: 'center',
    width: '100%',
    height: 'var(--article-end-media-height, 300px)',
    minWidth: 0,
    backgroundColor: palette.BLACK,
    color: palette.WHITE,
    '& > p': { padding: '1rem' },
  });

const playerStyles = (isPortrait: boolean) =>
  css({
    '&.media-container': {
      margin: 0,
      marginInline: 0,
      // Match the poster's frame without stretching portrait or landscape media.
      // Leave overflow visible so the native player and fullscreen controls work.
      width: `min(100%, calc(var(--article-end-media-height, 300px) * ${
        isPortrait ? '9 / 16' : '16 / 9'
      }))`,
      maxWidth: 'none',
      minWidth: 0,
    },
  });

const isPortraitMedia = (mediaBlock: MediaBlock) => {
  if (mediaBlock.type === 'portraitClipMedia') return true;

  if (mediaBlock.type === 'clipMedia') {
    const orientation = mediaBlock.model.video.version.orientation;
    return (
      getMediaOrientation(orientation ? [orientation] : undefined) ===
      'portrait'
    );
  }

  if (mediaBlock.type === 'aresMedia') {
    const metadata = mediaBlock.model.blocks.find(
      (block): block is AresMediaMetadataBlock =>
        block.type === 'aresMediaMetadata',
    )?.model;
    const version = metadata?.webcastVersions?.[0] || metadata?.versions?.[0];
    return getMediaOrientation(version?.types) === 'portrait';
  }

  return false;
};

/** Show the active card's paused player; unmount when leaving this card. */
export default function InlineMedia({
  mediaBlock,
  className,
  loadingMessage = 'Cargando reproductor…',
  unavailableMessage = 'No se ha podido cargar el reproductor. Puedes abrir el contenido con el enlace de esta tarjeta.',
}: Props) {
  const { nonce } = use(RequestContext);
  const playerId = useId();
  const blocks = useMemo(() => [mediaBlock], [mediaBlock]);
  const [loaderState, setLoaderState] = useState<
    'loading' | 'ready' | 'unavailable'
  >('loading');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;

    const waitForLoader = () => {
      if (typeof window.requirejs === 'function') {
        setLoaderState('ready');
      } else if (attempts >= 100) {
        setLoaderState('unavailable');
      } else {
        attempts += 1;
        timer = setTimeout(waitForLoader, 100);
      }
    };

    waitForLoader();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div css={containerStyles} className={className}>
      <BumpLoader nonce={nonce} />
      {loaderState === 'ready' ? (
        <MediaLoader
          blocks={blocks}
          uniqueId={`article-end-${playerId}`}
          loadPlayerOnInitialRender
          singleItemPlayback
          css={playerStyles(isPortraitMedia(mediaBlock))}
        />
      ) : (
        <p role="status">
          {loaderState === 'loading' ? loadingMessage : unavailableMessage}
        </p>
      )}
    </div>
  );
}
