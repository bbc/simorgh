import React from 'react';
import { Fragment, PropsWithChildren, use } from 'react';

import { LeftChevron, RightChevron } from '../../icons';

import { ServiceContext } from '../../../contexts/ServiceContext';

interface Props {
  link?: string;
  id?: string;
}

const Subhead = ({ children, link, id }: PropsWithChildren<Props>) => {
  const { dir } = use(ServiceContext);

  const Wrapper = link
    ? ({ children: innerChildren }: PropsWithChildren<Props>) => (
        <a 
          href={link} 
          className="focusIndicatorDisplayBlock text-grey-10 no-underline inline-block visited:text-grey-10 hover:text-postbox hover:[&_span]:underline focus:text-postbox focus:[&_span]:underline"
        >
          <span className="inline-block relative">{innerChildren}</span>
          {dir === 'ltr' ? 
            <RightChevron className="ms-2 fill-current w-[0.875rem] h-[0.875rem] relative" /> : 
            <LeftChevron className="ms-2 fill-current w-[0.875rem] h-[0.875rem] relative" />
          }
        </a>
      )
    : Fragment;
  return (
    <h2 className="font-sans-bold text-doublePica text-grey-10" id={id}>
      <Wrapper>{children}</Wrapper>
    </h2>
  );
};

export default Subhead;
