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
  buttonPrimary: PrimaryButton;
  buttonSecondary: SecondaryButton;
  isDismissible?: boolean;
  handleClose: () => void;
  handleInstallPWA?: () => void;
}

export declare function PWAUpsellBanner(props: BannerProps): JSX.Element;
