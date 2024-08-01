import { useState } from 'react';

export enum HoverStatus {
  HOVERING = 'hovering',
  NOT_HOVERING = 'not_hovering',
  INITIAL_STATE = 'initial_state',
}

const useOnHovering = () => {
  const [hovering, setOnHover] = useState(
    HoverStatus.INITIAL_STATE as HoverStatus,
  );

  const onMouseEnter = () => {
    setOnHover(HoverStatus.HOVERING);
  };

  const onMouseLeave = () => {
    setOnHover(HoverStatus.NOT_HOVERING);
  };

  return { hovering, listeners: { onMouseEnter, onMouseLeave } };
};

export default useOnHovering;
