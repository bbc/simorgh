import { useState } from 'react';
import ActionTooltip, { ActionTooltipStatus } from '.';
import getArticleTooltipContent from './ArticleTooltipContent';
import metadata from './metadata.json';
import readme from './README.md';

const TooltipDemo = ({ status }: { status: ActionTooltipStatus }) => {
  const [isVisible, setIsVisible] = useState(true);

  const actionTooltip = {
    success: {
      title: 'This article is now saved',
      bodyBefore: 'It will appear in',
      bodyAfter: '',
    },
    error: {
      title: 'Sorry something went wrong ',
      body: 'Check your connection, refresh the page and try again',
    },
    removed: {
      title: 'This article is now removed',
      bodyBefore: 'It will be removed from',
      bodyAfter: '',
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
        style={{ outlineOffset: '2px' }}
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
  parameters: {
    metadata,
    docs: { readme },
  },
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
