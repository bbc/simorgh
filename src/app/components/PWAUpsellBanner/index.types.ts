import type { JSX } from 'react';

export interface BannerButton {
  text: string;
  onClick: () => void;
}

export interface BannerProps {
  serviceBackground: 'mundo' | 'default';
  title: string;
  description: string;
  buttonPrimary: BannerButton;
  buttonSecondary: BannerButton;
  isDismissible?: boolean;
  handleClose: () => void;
  handleInstallPWA?: () => void;
}

export declare function PWAUpsellBanner(props: BannerProps): JSX.Element;
