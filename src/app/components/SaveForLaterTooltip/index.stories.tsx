import { useState } from 'react';
import SaveForLaterTooltip, { SaveForLaterTooltipStatus } from '.';

const TooltipDemo = ({ status }: { status: SaveForLaterTooltipStatus }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <SaveForLaterTooltip status={status} onClose={() => setIsVisible(false)} />
  );
};

export default {
  title: 'Components/SaveForLaterTooltip',
  component: SaveForLaterTooltip,
  globals: {
    service: {
      service: 'ws',
      variant: 'default',
    },
  },
};

export const Success = () => <TooltipDemo status="success" />;
export const Failed = () => <TooltipDemo status="error" />;
export const Removed = () => <TooltipDemo status="removed" />;