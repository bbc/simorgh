import React from 'react';
import { GREY_8, WHITE } from '#app/components/ThemeProvider/palette';

type BadgeProps = {
  icon: React.ReactNode;
  backgroundColor?: string;
  text: string;
};

const Badge = ({ icon, text, backgroundColor = GREY_8 }: BadgeProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor,
      padding: 15,
      borderRadius: 30,
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
