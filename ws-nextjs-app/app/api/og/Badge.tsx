import React from 'react';
import { GREY_8, WHITE } from '#app/components/ThemeProvider/palette';

type BadgeProps = {
  backgroundColor?: string;
  icon?: React.ReactNode;
  text: string;
  uppercase?: boolean;
};

const Badge = ({
  icon,
  text,
  backgroundColor = GREY_8,
  uppercase,
}: BadgeProps) => (
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
        gap: 10,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: WHITE,
      }}
    >
      {icon && icon}
      <span style={uppercase ? { textTransform: 'uppercase' } : {}}>
        {text}
      </span>
    </div>
  </div>
);

export default Badge;
