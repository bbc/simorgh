import type { Interpolation, Theme } from '@emotion/react';
import type { CSSProperties } from 'react';
import { Direction } from '#app/models/types/global';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import styles from './index.module.scss';

type IconProps = {
  className?: string;
  css?: Interpolation<Theme>;
  height?: string;
  isColoured?: boolean;
  isInverted?: boolean;
  name?: string;
  path?: string;
  useCurrentColor?: boolean;
  width?: string;
};

const toCssLength = (dimension?: string) => {
  if (!dimension) return '1em';
  return Number.isNaN(Number(dimension)) ? dimension : `${dimension}px`;
};

export const ExternalSvg = ({
  className,
  css,
  height,
  isColoured = false,
  isInverted = false,
  name,
  path,
  useCurrentColor = false,
  width,
}: IconProps) => {
  const {
    SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
  } = getEnvConfig();
  const classes = [className, 'external-svg'];
  const src = `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}${
    path || `images/icons/${name}.svg`
  }`;

  if (useCurrentColor) {
    const maskStyle: CSSProperties & {
      '--icon-source': string;
      '--icon-width': string;
      '--icon-height': string;
    } = {
      '--icon-source': `url("${src}")`,
      '--icon-width': toCssLength(width),
      '--icon-height': toCssLength(height),
    };

    return (
      <span
        aria-hidden="true"
        className={[
          ...classes,
          styles.mask,
          isInverted && styles.fallbackInverted,
        ]
          .filter(Boolean)
          .join(' ')}
        css={css}
        style={maskStyle}
      />
    );
  }
  const hasCssLength = [width, height].some(
    dimension => dimension && Number.isNaN(Number(dimension)),
  );
  const dimensions = hasCssLength
    ? {
        ...(width && Number.isNaN(Number(width)) ? { width } : {}),
        ...(height && Number.isNaN(Number(height)) ? { height } : {}),
      }
    : undefined;

  if (!isColoured) classes.push(styles.externalSvg);
  if (isInverted) classes.push(styles.inverted);

  return (
    <img
      alt=""
      aria-hidden="true"
      className={classes.filter(Boolean).join(' ')}
      css={css}
      height={height}
      src={src}
      style={dimensions}
      width={width}
    />
  );
};

const CurrentColorSvg = (props: IconProps) => (
  <ExternalSvg {...props} useCurrentColor />
);

export const Ellipsis = () => (
  <CurrentColorSvg name="ellipsis" width="12" height="12" />
);

export const LeftChevron = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="chevron-backward"
    className={className}
    width="12"
    height="12"
  />
);

export const RightChevron = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="chevron-forward"
    className={className}
    width="12"
    height="12"
  />
);

export enum ChevronOrientation {
  BACKWARD = 'backward',
  FORWARD = 'forward',
}

type ChevronProps = {
  className?: string;
  css?: Interpolation<Theme>;
  dir: Direction;
  isInverted?: boolean;
  orientation: ChevronOrientation;
};

export const Chevron = ({
  className,
  css,
  dir,
  isInverted,
  orientation,
}: ChevronProps) => {
  const isBackward =
    (orientation === ChevronOrientation.BACKWARD && dir === 'ltr') ||
    (orientation === ChevronOrientation.FORWARD && dir === 'rtl');

  return (
    <CurrentColorSvg
      name={isBackward ? 'chevron-backward' : 'chevron-forward'}
      className={className}
      css={css}
      isInverted={isInverted}
      width="12"
      height="12"
    />
  );
};

export const Clock = ({ className }: { className?: string }) => (
  <CurrentColorSvg name="clock" className={className} width="12" height="12" />
);

export const Book = ({ className }: { className?: string }) => (
  <CurrentColorSvg name="book" className={className} width="12" height="12" />
);

export const Words = ({ className }: { className?: string }) => (
  <CurrentColorSvg name="words" className={className} width="12" height="12" />
);

export const Articles = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="articles"
    className={className}
    width="12"
    height="12"
  />
);

export const Calendar = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="calendar"
    className={className}
    width="12"
    height="12"
  />
);

export const Favourites = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="favourites"
    className={className}
    width="12"
    height="12"
  />
);

export const Calculator = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="calculator"
    className={className}
    width="12"
    height="12"
  />
);

export const Close = ({
  className,
  css,
  width = '12',
  height = '12',
  isInverted,
}: Pick<
  IconProps,
  'className' | 'css' | 'height' | 'isInverted' | 'width'
>) => (
  <CurrentColorSvg
    name="close"
    className={className}
    css={css}
    width={width}
    height={height}
    isInverted={isInverted}
  />
);

export const Play = ({
  className,
  css,
  isInverted,
}: Pick<IconProps, 'className' | 'css' | 'isInverted'>) => (
  <CurrentColorSvg
    name="play"
    className={className}
    css={css}
    isInverted={isInverted}
    width="12"
    height="12"
  />
);

export const TriangleDown = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="triangle-down"
    className={className}
    width="16"
    height="16"
  />
);

export const Warning = ({
  className,
  css,
  isInverted,
}: Pick<IconProps, 'className' | 'css' | 'isInverted'>) => (
  <CurrentColorSvg
    name="warning"
    className={className}
    css={css}
    isInverted={isInverted}
    width="24"
    height="24"
  />
);

export const UpArrowIcon = () => (
  <CurrentColorSvg name="arrow-up" width="24" height="24" />
);

export const DownArrowIcon = () => (
  <CurrentColorSvg name="arrow-down" width="24" height="24" />
);

export const AccountIconRounded = ({
  className,
  css,
  isBlue = false,
  isInverted,
}: Pick<IconProps, 'className' | 'css' | 'isInverted'> & {
  isBlue?: boolean;
}) => (
  <CurrentColorSvg
    name={isBlue ? 'account-rounded-blue' : 'account-rounded'}
    className={[className, isBlue && styles.blue].filter(Boolean).join(' ')}
    css={css}
    isInverted={isInverted}
    width="24"
    height="24"
  />
);

export const AccountIcon = ({
  className,
  css,
  isInverted,
}: Pick<IconProps, 'className' | 'css' | 'isInverted'>) => (
  <CurrentColorSvg
    name="account"
    className={className}
    css={css}
    isInverted={isInverted}
    width="20"
    height="18"
  />
);

export const BookmarkIcon = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="bookmark"
    className={className}
    width="20"
    height="20"
  />
);

export const FilledBookmarkIcon = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="bookmark-filled"
    className={className}
    width="20"
    height="20"
  />
);

export const PlusIcon = ({ className }: { className?: string }) => (
  <CurrentColorSvg name="plus" className={className} width="20" height="20" />
);

export const TickIcon = ({ className }: { className?: string }) => (
  <CurrentColorSvg name="tick" className={className} width="20" height="20" />
);

export const Spinner = ({ className }: { className?: string }) => (
  <CurrentColorSvg
    name="spinner"
    className={className}
    width="20"
    height="20"
  />
);

export const RedCardSVG = ({ className }: { className?: string }) => (
  <ExternalSvg
    name="red-card"
    className={className}
    height={`${pixelsToRem(16)}rem`}
    isColoured
    width={`${pixelsToRem(11)}rem`}
  />
);

export const SecondYellowCardSVG = ({ className }: { className?: string }) => (
  <ExternalSvg
    name="second-yellow-card"
    className={className}
    height={`${pixelsToRem(19)}rem`}
    isColoured
    width={`${pixelsToRem(16)}rem`}
  />
);

export const InfoTriangle = ({
  className,
  isInverted,
}: Pick<IconProps, 'className' | 'isInverted'>) => (
  <CurrentColorSvg
    name="info-triangle"
    className={className}
    isInverted={isInverted}
    width="22"
    height="22"
  />
);

export const InfoCircle = ({
  className,
  isInverted,
}: Pick<IconProps, 'className' | 'isInverted'>) => (
  <CurrentColorSvg
    name="info-circle"
    className={className}
    isInverted={isInverted}
    width="22"
    height="22"
  />
);
