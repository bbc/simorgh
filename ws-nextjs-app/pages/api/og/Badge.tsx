import React from 'react';
import { BLACK, WHITE } from '#app/components/ThemeProvider/palette';

type BadgeProps = {
  icon: React.ReactNode;
  backgroundColor?: string;
  text: string;
};

const Badge = ({ icon, text, backgroundColor = BLACK }: BadgeProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor,
      padding: 15,
      borderRadius: 30,
      // marginRight: index < arr.length - 1 ? '20px' : '0px',
    }}
  >
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
  </div>
);

export default Badge;
