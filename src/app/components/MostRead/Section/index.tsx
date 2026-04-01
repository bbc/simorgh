import { PropsWithChildren } from 'react';

interface MostReadSectionProps {
  className?: string;
  showSectionLabel?: boolean;
}

const MostReadSection = ({
  children,
  className = '',
  showSectionLabel,
}: PropsWithChildren<MostReadSectionProps>) => (
  <section
    data-e2e="most-read"
    data-testid="most-read"
    {...(showSectionLabel
      ? { role: 'region', 'aria-labelledby': 'Most-Read' }
      : {})}
    {...(className ? { className } : undefined)}
  >
    {children}
  </section>
);

export default MostReadSection;
