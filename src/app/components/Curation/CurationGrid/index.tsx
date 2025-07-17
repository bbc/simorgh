import React from 'react';
import CurationPromo from '../CurationPromo';
import { CurationGridProps } from '../types';

const CurationGrid = ({
  summaries,
  isFirstCuration,
  headingLevel,
}: CurationGridProps) => {
  const hasMultiplePromos = summaries.length > 1;
  const firstPromo = summaries[0];

  if (summaries.length === 0) {
    return null;
  }
  return (
    <div data-testid="curation-grid-normal">
      {hasMultiplePromos ? (
        <ul className="list-none p-0 m-0" role="list" data-testid="topic-promos">
          {summaries.map((promo, index) => {
            const isFirstPromo = index === 0;
            const lazyLoadImages = !(isFirstPromo && isFirstCuration);

            return (
              <li 
                key={promo.id}
                className="align-top inline-block mb-double w-full group-2:border-t group-2:border-grey-3 group-2:pt-full group-3:me-double group-3:mb-triple group-3:w-[calc(50%-0.5rem)] group-3:nth-of-type-2n:me-0 group-4:me-double group-4:mb-[2.125rem] group-4:w-[calc(25%-0.75rem)] group-4:nth-of-type-4n:me-0"
              >
                <CurationPromo
                  {...promo}
                  lazy={lazyLoadImages}
                  headingLevel={headingLevel}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="align-top inline-block mb-double w-full group-2:border-t group-2:border-grey-3 group-2:pt-full group-3:me-double group-3:mb-triple group-3:w-[calc(50%-0.5rem)] group-3:nth-of-type-2n:me-0 group-4:me-double group-4:mb-[2.125rem] group-4:w-[calc(25%-0.75rem)] group-4:nth-of-type-4n:me-0">
          <CurationPromo
            {...firstPromo}
            lazy={!isFirstCuration}
            headingLevel={headingLevel}
          />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
