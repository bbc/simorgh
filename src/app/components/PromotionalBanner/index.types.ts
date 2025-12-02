export interface PromotionalBannerButtonData {
  text: string;
  longText?: string;
}

export interface PromotionalBannerConfig {
  title: string;
  description: string;
  orText: string;
  bannerLabel: string;
  closeLabel?: string;
  primaryButton: PromotionalBannerButtonData;
  secondaryButton: PromotionalBannerButtonData;
}

export interface PromotionalBannerProps extends PromotionalBannerConfig {
  id?: string;
  isDismissible?: boolean;
  onPrimaryClick: (event?: React.MouseEvent) => void;
  onSecondaryClick: (event?: React.MouseEvent) => void;
  onClose?: (event?: React.MouseEvent) => void;
}
