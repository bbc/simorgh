import { useState } from 'react';
import ActionTooltip, { ActionTooltipStatus } from '.';

const TooltipDemo = ({ status }: { status: ActionTooltipStatus }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <ActionTooltip status={status} onClose={() => setIsVisible(false)} />
  );
};

export default {
  title: 'Components/ActionTooltip',
  component: ActionTooltip,
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