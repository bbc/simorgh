import { useState } from 'react';

const useOnHovering = () => {
  const [hovering, setOnHover] = useState(null as unknown as boolean);

  const onMouseEnter = () => {
    setOnHover(true);
  };

  const onMouseLeave = () => {
    setOnHover(false);
  };

  return { hovering, listeners: { onMouseEnter, onMouseLeave } };
};

export default useOnHovering;
