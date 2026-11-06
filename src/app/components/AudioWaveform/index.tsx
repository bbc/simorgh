import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import nodeLogger from '#app/lib/logger.node';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import styles from './index.module.scss';

const logger = nodeLogger(__filename);

type CapturableMedia = HTMLMediaElement & {
  captureStream: () => MediaStream;
};

const supportsCapture = (media: HTMLMediaElement): media is CapturableMedia =>
  'captureStream' in media && typeof media.captureStream === 'function';

export const findMedia = (root: ParentNode): HTMLMediaElement | null => {
  const media = root.querySelector<HTMLMediaElement>('audio, video');
  if (media) return media;

  return (
    Array.from(root.querySelectorAll('*'))
      .map(element => element.shadowRoot)
      .filter((shadowRoot): shadowRoot is ShadowRoot => Boolean(shadowRoot))
      .map(findMedia)
      .find(Boolean) ?? null
  );
};

export const captureAudio = (media: HTMLMediaElement) => {
  if (!supportsCapture(media)) {
    throw new Error('Stream capture is unavailable. Try desktop Chrome.');
  }
  if (media.paused || media.readyState < 2) {
    throw new Error('Waiting for the podcast to play.');
  }

  const stream = media.captureStream();
  if (stream.getAudioTracks().length === 0) {
    stream.getTracks().forEach(track => track.stop());
    throw new Error('The player did not expose an audio track for capture.');
  }
  return stream;
};

export const getPlaybackMessage = ({
  media,
  signalMissing,
  reducedMotion,
}: {
  media: HTMLMediaElement;
  signalMissing: boolean;
  reducedMotion: boolean;
}) => {
  if (media.ended) return 'Podcast ended.';
  if (media.paused) return 'Paused.';
  if (media.readyState < 3) return 'Buffering.';
  if (media.muted || media.volume === 0) return 'Muted.';
  if (signalMissing) return 'No signal: silence or restricted audio capture.';
  if (reducedMotion)
    return 'Live signal; animation disabled for reduced motion.';
  return 'Live audio waveform.';
};

type Analysis = {
  context: AudioContext;
  stream?: MediaStream;
  source?: MediaStreamAudioSourceNode;
  analyser?: AnalyserNode;
  silentOutput?: GainNode;
  removePlaybackListeners?: () => void;
};

const AudioWaveform = () => {
  const [target, setTarget] = useState<Element | null>(null);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analysisRef = useRef<Analysis | null>(null);
  const frameRef = useRef<number | null>(null);
  const startingRef = useRef(false);
  const mountedRef = useRef(false);

  const stop = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    const analysis = analysisRef.current;
    analysisRef.current = null;
    if (analysis) {
      analysis.removePlaybackListeners?.();
      analysis.source?.disconnect();
      analysis.analyser?.disconnect();
      analysis.silentOutput?.disconnect();
      analysis.stream?.getTracks().forEach(track => track.stop());
      analysis.context.close().catch(error => {
        logger.error(MEDIA_PLAYER_STATUS, {
          message: 'Audio waveform context cleanup failed',
          error,
        });
        if (mountedRef.current) {
          setMessage('Unable to close the waveform audio context.');
        }
      });
    }
    if (mountedRef.current) {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    if (
      new URLSearchParams(window.location.search).get('audioWaveform') === '1'
    ) {
      setTarget(
        document.querySelector('[data-e2e="on-demand-image"] img')
          ?.parentElement ?? null,
      );
    }
    return () => {
      mountedRef.current = false;
      stop();
    };
  }, [stop]);

  const start = useCallback(async () => {
    if (startingRef.current || analysisRef.current) return;
    const root = document.querySelector('[data-e2e="media-player"]');
    const media = root && findMedia(root);
    if (!media) {
      setMessage('No accessible media element yet. Start playback first.');
      return;
    }
    if (typeof window.AudioContext !== 'function') {
      setMessage('Web Audio is unavailable in this browser.');
      return;
    }

    startingRef.current = true;
    try {
      const context = new AudioContext();
      const analysis: Analysis = { context };
      analysisRef.current = analysis;
      const updateVisibility = () => {
        setVisible(!media.paused && !media.ended);
      };
      const playbackEvents = ['play', 'playing', 'pause', 'ended'];
      playbackEvents.forEach(event =>
        media.addEventListener(event, updateVisibility),
      );
      analysis.removePlaybackListeners = () => {
        playbackEvents.forEach(event =>
          media.removeEventListener(event, updateVisibility),
        );
      };
      const stream = captureAudio(media);
      analysis.stream = stream;
      const source = context.createMediaStreamSource(
        new MediaStream(stream.getAudioTracks()),
      );
      analysis.source = source;
      const analyser = context.createAnalyser();
      analysis.analyser = analyser;
      analyser.fftSize = 1024;
      const silentOutput = context.createGain();
      analysis.silentOutput = silentOutput;
      silentOutput.gain.value = 0;
      source.connect(analyser);
      analyser.connect(silentOutput);
      silentOutput.connect(context.destination);
      await context.resume();
      if (!mountedRef.current || analysisRef.current?.context !== context) {
        return;
      }
      const canvas = canvasRef.current;
      const drawing = canvas?.getContext('2d');
      if (!canvas || !drawing)
        throw new Error('Canvas drawing is unavailable.');
      updateVisibility();

      const samples = new Float32Array(analyser.fftSize);
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );
      const colour = getComputedStyle(canvas).color;
      const shadowColour =
        getComputedStyle(canvas).getPropertyValue('--waveform-shadow');
      let lastFrame = 0;
      let lastSignal = performance.now();
      let reportedMissingSignal = false;

      const draw = (now: number) => {
        if (analysisRef.current?.context !== context) return;
        if (
          !media.isConnected ||
          stream.getAudioTracks().every(track => track.readyState === 'ended')
        ) {
          stop();
          logger.error(MEDIA_PLAYER_STATUS, {
            message: 'Audio waveform captured track ended',
          });
          return;
        }
        if (
          now - lastFrame >= 1000 / 30 &&
          !document.hidden &&
          !reducedMotion.matches
        ) {
          lastFrame = now;
          analyser.getFloatTimeDomainData(samples);
          const peak = samples.reduce(
            (maximum, sample) => Math.max(maximum, Math.abs(sample)),
            0,
          );
          if (peak > 0.0001) lastSignal = now;
          const playing =
            !media.paused && !media.ended && media.readyState >= 3;
          const audible = playing && !media.muted;
          if (playing && now - lastSignal > 5000 && !reportedMissingSignal) {
            reportedMissingSignal = true;
            logger.warn(MEDIA_PLAYER_STATUS, {
              message:
                'Audio waveform has no signal: silence or restricted capture',
            });
          }
          const width = Math.round(canvas.clientWidth * devicePixelRatio);
          const height = Math.round(canvas.clientHeight * devicePixelRatio);
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }
          drawing.clearRect(0, 0, width, height);
          drawing.strokeStyle = colour;
          drawing.shadowColor = shadowColour;
          drawing.shadowBlur = 3 * devicePixelRatio;
          drawing.lineWidth = 2 * devicePixelRatio;
          drawing.beginPath();
          samples.forEach((sample, index) => {
            const x = (index / (samples.length - 1)) * width;
            const y =
              height / 2 +
              (audible && !reducedMotion.matches ? sample * media.volume : 0) *
                height *
                0.45;
            if (index === 0) drawing.moveTo(x, y);
            else drawing.lineTo(x, y);
          });
          drawing.stroke();
        }
        frameRef.current = requestAnimationFrame(draw);
      };
      frameRef.current = requestAnimationFrame(draw);
    } catch (error) {
      stop();
      logger.error(MEDIA_PLAYER_STATUS, {
        message: 'Audio waveform capture failed',
        error,
      });
      if (mountedRef.current) {
        setMessage(error instanceof Error ? error.message : String(error));
      }
    } finally {
      startingRef.current = false;
    }
  }, [stop]);

  useEffect(() => {
    if (!target) return undefined;
    const attemptedMedia = new WeakSet<HTMLMediaElement>();
    const checkPlayback = () => {
      const root = document.querySelector('[data-e2e="media-player"]');
      const media = root && findMedia(root);
      if (
        !media ||
        media.paused ||
        media.readyState < 2 ||
        attemptedMedia.has(media) ||
        startingRef.current ||
        analysisRef.current
      )
        return;
      attemptedMedia.add(media);
      start();
    };
    checkPlayback();
    const interval = window.setInterval(checkPlayback, 250);
    return () => window.clearInterval(interval);
  }, [target, start]);

  return target
    ? createPortal(
        <section
          className={styles.panel}
          lang="en"
          dir="ltr"
          aria-label="Live audio waveform prototype"
          data-playing={visible}
        >
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
          />
          {message && (
            <p role="status" className={styles.error}>
              {message}
            </p>
          )}
        </section>,
        target,
      )
    : null;
};

export default AudioWaveform;
