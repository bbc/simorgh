import type { JSX } from 'react';

export declare const PWAUpsellBanner: (props: {
  serviceBackground: 'mundo' | 'default'; // do we need all the services here?

  handleClose: () => void;

  title: string;

  description: string;

  buttonPrimary: object;

  buttonSecondary: object;

  isDismissible?: boolean;
}) => JSX.Element;

export default PWAUpsellBanner;
