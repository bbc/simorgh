import React from 'react';
import { FooterLink } from '#app/models/types/serviceConfig';
import { ReactElement } from 'react';
import Link from '../Link';

const getRowCount = ({
  itemCount,
  columns,
  trustProjectLink,
}: {
  itemCount: number;
  columns: number;
  trustProjectLink?: FooterLink;
}) =>
  trustProjectLink
    ? Math.ceil(itemCount / columns) + 1
    : Math.ceil(itemCount / columns);

export default ({
  elements = [],
  trustProjectLink,
  extraLinks,
}: {
  elements?: (ReactElement | null)[];
  trustProjectLink?: FooterLink;
  extraLinks?: boolean;
}) => {
  const itemCount = elements.length;
  
  const getGridRows = (columns: number) => 
    `repeat(${getRowCount({ itemCount, columns, trustProjectLink })}, auto)`;

  return (
    <ul
      role="list"
      className={`
        border-b border-gel-shadow
        columns-4
        m-0
        list-none
        supports-[display:grid]:grid
        supports-[display:grid]:grid-flow-col
        group-0:grid-flow-row
        group-0:columns-1
        group-1:gap-x-4 group-1:grid-cols-2 group-1:columns-2
        group-2:gap-x-4 group-2:grid-cols-2 group-2:columns-2
        group-3:gap-x-8 group-3:grid-cols-3 group-3:columns-3
        group-4:gap-x-8 group-4:grid-cols-4 group-4:columns-4
        group-5:gap-x-8 group-5:grid-cols-5 group-5:columns-5
        ${trustProjectLink ? 'pb-4' : 'py-4'}
        ${trustProjectLink ? 
          `[&>li:first-child]:border-b [&>li:first-child]:border-gel-shadow 
           [&>li:first-child]:py-4 [&>li:first-child]:mb-4 
           [&>li:first-child]:col-span-full [&>li:first-child]:w-full
           [&>li:first-child]:column-span-all` : ''}
        ${extraLinks ? 'group-2:grid-cols-1 group-2:columns-1 group-2:grid-flow-row' : ''}
      `}
      style={{
        gridTemplateRows: window.CSS?.supports('display: grid') ? 
          `
            ${getGridRows(2)} /* group-1 and group-2 */
          ` : undefined
      }}
    >
      {trustProjectLink && (
        <li className="min-w-[50%] gap-x-8 break-inside-avoid">
          <Link text={trustProjectLink.text} href={trustProjectLink.href} />
        </li>
      )}
      {elements.map((elem, index) => (
        <li 
          key={index}
          className="min-w-[50%] gap-x-8 break-inside-avoid"
        >
          {elem}
        </li>
      ))}
    </ul>
  );
};
