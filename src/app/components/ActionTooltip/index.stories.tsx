import { useState } from 'react';
import ActionTooltip, { ActionTooltipStatus } from '.';
import getArticleTooltipContent from './ArticleTooltipContent';

const TooltipDemo = ({ status }: { status: ActionTooltipStatus }) => {
  const [isVisible, setIsVisible] = useState(true);

  const actionTooltip = {
    success: {
      titleBefore: 'This article is now saved to the',
      titleAfter: 'successfully',
    },
    error: {
      title: 'Sorry something went wrong ',
      body: 'Check your connection, refresh the page and try again',
    },
    removed: {
      titleBefore: 'This article has been removed from',
      titleAfter: '',
    },
    myNewsLinkText: 'My News',
    myNewsUrl: '/my-news',
    closeLabel: 'Close',
  };

  const content = getArticleTooltipContent(actionTooltip);

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        Open tooltip
      </button>

      {isVisible && (
        <ActionTooltip
          status={status}
          content={content}
          closeLabel={actionTooltip.closeLabel}
          onClose={() => setIsVisible(false)}
        />
      )}
    </div>
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
