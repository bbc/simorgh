import type { ReactNode } from 'react';

interface ConditionalOnwardJourneyLinkProps {
  isConciseView?: boolean;
  onwardJourneyLink?: string;
  children: ReactNode;
  tipoTopicId?: string;
}

export const ConditionalOnwardJourneyLink = ({
  children,
}: ConditionalOnwardJourneyLinkProps) => {
  // TODO: Implement onward journey link functionality when tracking is available
  // if (isConciseView && onwardJourneyLink) {
  //   return (
  //     <a href={onwardJourneyLink} data-tipo-id={tipoTopicId}>
  //       {children}
  //     </a>
  //   );
  // }

  return <>{children}</>;
};
