import type { ReactNode } from 'react';

interface ConditionalOnwardJourneyLinkProps {
  children: ReactNode;
}

// eslint-disable-next-line import/prefer-default-export
export const ConditionalOnwardJourneyLink = ({
  children,
}: ConditionalOnwardJourneyLinkProps) => {
  return children;
};
