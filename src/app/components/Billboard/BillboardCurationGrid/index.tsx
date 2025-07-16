import React from 'react';
import CurationPromo from '../../Curation/CurationPromo';
import { CurationGridProps } from '../../Curation/types';

const BillboardCurationGrid = ({ summaries }: CurationGridProps) => {
  const top4SummariesForGrid = summaries.slice(0, 4);

  if (top4SummariesForGrid.length === 0) {
    return null;
  }

  const hasMultiplePromos = top4SummariesForGrid.length > 1;
  const firstPromo = top4SummariesForGrid[0];

  return (
    <div data-testid="billboard-curation-grid">
      {hasMultiplePromos ? (
        <ul 
          className="list-none p-0 m-0 grid gap-4 grid-cols-1 group-2-max:grid-cols-1 group-3:grid-cols-3 group-4:grid-cols-4 group-3:[&>li:nth-child(4)]:hidden"
          role="list" 
          data-testid="billboard-promos"
        >
          {top4SummariesForGrid.map(promo => (
            <li 
              key={promo.id}
              className="align-top block w-full border-t border-grey-3 pt-full group-2-max:border-t group-2-max:pt-full group-3:mb-double group-4:mb-double [&_.promo-image]:group-2-max:w-1/3 [&_.promo-image]:group-2-max:inline-block [&_.promo-image]:group-2-max:align-top [&_.promo-text]:group-2-max:w-2/3 [&_.promo-text]:group-2-max:inline-block [&_.promo-text]:group-2-max:align-top [&_.promo-text]:group-2-max:pl-full [&_.promo-text>h3>a]:text-white [&_.promo-text>h3>a:visited]:text-grey-5 [&_.promo-text>time.promo-timestamp]:text-white [&_.promo-text>time.promo-timestamp:visited]:text-grey-5 [&_.promo-text>time.promo-timestamp]:group-2-max:mb-double"
            >
              <CurationPromo {...promo} lazy headingLevel={3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="align-top block w-full border-t border-grey-3 pt-full group-2-max:border-t group-2-max:pt-full group-3:mb-double group-3:grid group-3:grid-cols-3 group-3:[&>*]:col-span-1 group-4:mb-double group-4:grid group-4:grid-cols-4 group-4:[&>*]:col-span-1">
          <CurationPromo {...firstPromo} lazy headingLevel={3} />
        </div>
      )}
    </div>
  );
};

export default BillboardCurationGrid;
