import React, { PropsWithChildren } from 'react';

interface MostReadSectionProps {
  className?: string;
}

const MostReadSection = ({
  children,
  className = '',
}: PropsWithChildren<MostReadSectionProps>) => (
  <section
    role="region"
    aria-labelledby="Most-Read"
    data-e2e="most-read"
    data-testid="most-read"
    {...(className && { className })}
  >
    {children}
  </section>
);

export default MostReadSection;
