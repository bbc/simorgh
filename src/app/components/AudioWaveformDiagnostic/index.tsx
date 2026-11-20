import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

const describeError = (error: unknown) =>
  error instanceof Error ? `${error.name}: ${error.message}` : String(error);

export const inspectMedia = (root: ParentNode, depth = 0): string[] => {
  if (depth >= 4) return ['DOM nesting limit reached'];

  const media = Array.from(
    root.querySelectorAll<HTMLMediaElement>('audio, video'),
  ).flatMap(element => [
    `${element.tagName.toLowerCase()} accessible`,
    `Native time: ${element.currentTime.toFixed(2)}s`,
    `Paused: ${element.paused}; muted: ${element.muted}`,
    `Ready state: ${element.readyState}`,
    'Audio-sample / CORS access: not tested',
  ]);

  const frames = Array.from(
    root.querySelectorAll<HTMLIFrameElement>('iframe'),
  ).flatMap(frame => {
    try {
      const frameDocument = frame.contentDocument;
      return frameDocument
        ? inspectMedia(frameDocument, depth + 1)
        : ['Frame DOM unavailable (cross-origin or not loaded)'];
    } catch (error) {
      return [`Frame access failed: ${describeError(error)}`];
    }
  });

  const shadowRoots = Array.from(root.querySelectorAll('*')).flatMap(element =>
    element.shadowRoot
      ? [
          'Open shadow DOM accessible',
          ...inspectMedia(element.shadowRoot, depth + 1),
        ]
      : [],
  );

  return [...media, ...frames, ...shadowRoots];
};

const AudioWaveformDiagnostic = ({ playerId }: { playerId: string }) => {
  const [target, setTarget] = useState<Element | null>(null);
  const [report, setReport] = useState('');

  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get('audioWaveformDebug') !==
      '1'
    )
      return undefined;

    const inspect = () => {
      setTarget(document.querySelector('[data-e2e="on-demand-image"]'));
      const player = window.mediaPlayers?.[playerId];
      const playerContainer = document.querySelector(
        '[data-e2e="media-player"]',
      );
      const mediaReport = playerContainer
        ? [...new Set(inspectMedia(playerContainer))]
        : [];

      const clock = () => {
        if (!player) return 'Player API: waiting for player';

        try {
          const time = player.currentTime();
          return Number.isFinite(time)
            ? `Player time: ${time.toFixed(2)}s`
            : 'Player clock returned an invalid time';
        } catch (error) {
          return `Player clock failed: ${describeError(error)}`;
        }
      };

      setReport(
        [
          'Audio waveform diagnostic',
          clock(),
          `Web Audio API: ${typeof window.AudioContext === 'function' ? 'available' : 'unavailable'}`,
          ...mediaReport,
          ...(!mediaReport.includes('audio accessible') &&
          !mediaReport.includes('video accessible')
            ? ['No accessible audio/video element found']
            : []),
          'Read-only: no audio analysis or capture',
        ].join('\n'),
      );
    };

    inspect();
    const interval = window.setInterval(inspect, 500);
    return () => window.clearInterval(interval);
  }, [playerId]);

  return target
    ? createPortal(
        <pre
          className={styles.panel}
          lang="en"
          dir="ltr"
          aria-label="Audio waveform diagnostic"
          aria-live="off"
        >
          {report}
        </pre>,
        target,
      )
    : null;
};

export default AudioWaveformDiagnostic;
