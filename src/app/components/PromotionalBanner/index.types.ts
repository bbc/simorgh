interface PromotionalBannerButton {
  text: string;
  longText?: string;
  onClick?: () => void;
}

export interface PromotionalBannerProps {
  title: string;
  description: string;
  orText: string;
  primaryButton: PromotionalBannerButton;
  secondaryButton: PromotionalBannerButton;
  id?: string;
  isDismissible?: boolean;
  handleClose?: () => void;
}
