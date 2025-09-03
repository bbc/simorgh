import React from 'react';
import { BLACK, WHITE } from '#app/components/ThemeProvider/palette';

type BadgeProps = {
  text: string;
  icon?: React.ReactNode;
  textColour?: string;
  uppercase?: boolean;
};

const Badge = ({ text, textColour = WHITE, uppercase, icon }: BadgeProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: BLACK,
      padding: 15,
      borderRadius: 8,
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: WHITE,
      }}
    >
      {icon && icon}
      <span
        style={{
          textTransform: uppercase ? 'uppercase' : 'none',
          color: textColour,
        }}
      >
        {text}
      </span>
    </div>
  </div>
);

export default Badge;
