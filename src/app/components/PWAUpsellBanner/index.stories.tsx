import React from 'react';
import PWAUpsellBanner from '.';

export const Component = () => (
  <PWAUpsellBanner
    title="Accede a BBC Noticias con un solo toque"
    description="Agrega un acceso directo de BBC Mundo a tu pantalla de inicio para un acceso rápido y sencillo."
    primaryButton={{
      shortText: 'Agregar',
      longText: 'Agregar a la pantalla de inicio',
      onClick: () => console.log('Primary clicked'),
    }}
    secondaryButton={{
      text: 'No ahora',
      onClick: () => console.log('Secondary clicked'),
    }}
    isDismissible
    handleClose={() => console.log('Banner closed')}
    handleInstallPWA={() => console.log('Install PWA clicked')}
  />
);

export default {
  title: 'Components/PWAUpsellBanner',
  Component,
};
