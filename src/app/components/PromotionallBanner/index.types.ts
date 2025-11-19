import type { JSX } from 'react';

export interface ButtonBase {
  onClick: () => void;
}

export interface PrimaryButton extends ButtonBase {
  shortText: string;
  longText?: string;
}

export interface SecondaryButton extends ButtonBase {
  text: string;
}

export interface BannerProps {
  title: string;
  description: string;
  primaryButton: PrimaryButton;
  secondaryButton: SecondaryButton;
  isDismissible?: boolean;
  handleClose: () => void;
  handlePrimaryAction?: () => void;
}

export declare function PromotionalBanner(props: BannerProps): JSX.Element;
