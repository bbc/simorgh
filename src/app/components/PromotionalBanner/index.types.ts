import type { Interpolation, Theme } from '@emotion/react';

export interface PromotionalBannerButtonData {
  text: string;
  longText?: string;
}

export type PromotionalBannerStyleOverrides = Partial<{
  banner: Interpolation<Theme>;
  content: Interpolation<Theme>;
  textContainer: Interpolation<Theme>;
  title: Interpolation<Theme>;
  description: Interpolation<Theme>;
  actionsContainer: Interpolation<Theme>;
  closeButton: Interpolation<Theme>;
}>;

export interface PromotionalBannerConfig {
  title: string;
  description: string;
  buttonSeparatorText: string;
  bannerLabel: string;
  closeLabel?: string;
  primaryButton?: PromotionalBannerButtonData;
  secondaryButton?: PromotionalBannerButtonData;
}

export interface PromotionalBannerProps extends PromotionalBannerConfig {
  id?: string;
  isDismissible?: boolean;
  onPrimaryClick?: (event?: React.MouseEvent) => void;
  onSecondaryClick?: (event?: React.MouseEvent) => void;
  onClose?: (event?: React.MouseEvent) => void;
  children?: React.ReactNode;
  topImage?: React.ReactNode;
  styleOverrides?: PromotionalBannerStyleOverrides;
}
