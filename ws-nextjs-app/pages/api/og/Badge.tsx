import { WHITE } from '#app/components/ThemeProvider/palette';
import React from 'react';

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: WHITE,
    }}
  >
    <span style={{ marginRight: 10 }}>{icon}</span>
    <span>{text}</span>
  </div>
);

export default Badge;
