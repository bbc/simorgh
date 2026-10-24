import type { Interpolation, Theme } from '@emotion/react';
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
  width?: string;
};

export const ExternalSvg = ({
  className,
  css,
  height,
  isColoured = false,
  isInverted = false,
  name,
  path,
  width,
}: IconProps) => {
  const {
    SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
  } = getEnvConfig();
  const classes = [className, 'external-svg'];

  if (!isColoured) classes.push(styles.externalSvg);
  if (isInverted) classes.push(styles.inverted);

  return (
    <img
      alt=""
      aria-hidden="true"
      className={classes.filter(Boolean).join(' ')}
      css={css}
      height={height}
      src={`${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}${
        path || `images/icons/${name}.svg`
      }`}
      width={width}
    />
  );
};

export const Ellipsis = () => (
  <ExternalSvg name="ellipsis" width="12" height="12" />
);

export const LeftChevron = ({ className }: { className?: string }) => (
  <ExternalSvg
    name="chevron-backward"
    className={className}
    width="12"
    height="12"
  />
);

export const RightChevron = ({ className }: { className?: string }) => (
  <ExternalSvg
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
    <ExternalSvg
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
  <ExternalSvg name="clock" className={className} width="12" height="12" />
);

export const Book = ({ className }: { className?: string }) => (
  <ExternalSvg name="book" className={className} width="12" height="12" />
);

export const Words = ({ className }: { className?: string }) => (
  <ExternalSvg name="words" className={className} width="12" height="12" />
);

export const Articles = ({ className }: { className?: string }) => (
  <ExternalSvg name="articles" className={className} width="12" height="12" />
);

export const Calendar = ({ className }: { className?: string }) => (
  <ExternalSvg name="calendar" className={className} width="12" height="12" />
);

export const Favourites = ({ className }: { className?: string }) => (
  <ExternalSvg name="favourites" className={className} width="12" height="12" />
);

export const Calculator = ({ className }: { className?: string }) => (
  <ExternalSvg name="calculator" className={className} width="12" height="12" />
);

export const Close = ({
  className,
  width = '12',
  height = '12',
}: {
  className?: string;
  width?: string;
  height?: string;
}) => (
  <ExternalSvg
    name="close"
    className={className}
    width={width}
    height={height}
  />
);

export const Play = ({
  className,
  css,
  isInverted,
}: Pick<IconProps, 'className' | 'css' | 'isInverted'>) => (
  <ExternalSvg
    name="play"
    className={className}
    css={css}
    isInverted={isInverted}
    width="12"
    height="12"
  />
);

export const TriangleDown = ({ className }: { className?: string }) => (
  <ExternalSvg name="triangle-down" className={className} />
);

export const Warning = ({
  className,
  css,
  isInverted,
}: Pick<IconProps, 'className' | 'css' | 'isInverted'>) => (
  <ExternalSvg
    name="warning"
    className={className}
    css={css}
    isInverted={isInverted}
    width="24"
    height="24"
  />
);

export const UpArrowIcon = () => (
  <ExternalSvg name="arrow-up" width="24" height="24" />
);

export const DownArrowIcon = () => (
  <ExternalSvg name="arrow-down" width="24" height="24" />
);

export const AccountIconRounded = ({ className }: { className?: string }) => (
  <ExternalSvg
    name="account-rounded"
    className={className}
    width="24"
    height="24"
  />
);

export const AccountIcon = ({ className }: { className?: string }) => (
  <ExternalSvg name="account" className={className} width="20" height="18" />
);

export const BookmarkIcon = ({ className }: { className?: string }) => (
  <ExternalSvg name="bookmark" className={className} width="20" height="20" />
);

export const FilledBookmarkIcon = ({ className }: { className?: string }) => (
  <ExternalSvg
    name="bookmark-filled"
    className={className}
    width="20"
    height="20"
  />
);

export const PlusIcon = ({ className }: { className?: string }) => (
  <ExternalSvg name="plus" className={className} width="20" height="20" />
);

export const TickIcon = ({ className }: { className?: string }) => (
  <ExternalSvg name="tick" className={className} width="20" height="20" />
);

export const Spinner = ({ className }: { className?: string }) => (
  <ExternalSvg name="spinner" className={className} width="20" height="20" />
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

export const InfoTriangle = ({ className }: { className?: string }) => (
  <ExternalSvg
    name="info-triangle"
    className={className}
    width="22"
    height="22"
  />
);

export const InfoCircle = ({ className }: { className?: string }) => (
  <ExternalSvg
    name="info-circle"
    className={className}
    width="22"
    height="22"
  />
);
