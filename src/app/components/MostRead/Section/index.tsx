import React, { PropsWithChildren } from 'react';

interface MostReadSectionProps {
  className?: string;
}

const MostReadSection = ({
  children,
  className = '',
}: PropsWithChildren<MostReadSectionProps>) => (
  <section
    className={className}
    role="region"
    aria-labelledby="Most-Read"
    data-e2e="most-read"
    data-testid="most-read"
  >
    {children}
  </section>
);

export default MostReadSection;
