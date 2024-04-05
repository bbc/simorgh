import React, { PropsWithChildren } from 'react';
import Promo from '#app/legacy/components/Promo';
import LiveLabel from './index';
import readme from './README.md';
import Heading from '../Heading';
import metadata from './metadata.json';

interface Props {
  ariaHidden?: boolean;
  offScreenText?: string;
  text?: string;
  className?: string;
}

const Component = ({
  offScreenText,
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <LiveLabel offScreenText={offScreenText} className={className}>
      {children}
    </LiveLabel>
  );
};

export default {
  title: 'Components/Live Label',
  parameters: {
    metadata,
    docs: { readme },

    design: [
      {
        name: 'Group 0',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14619&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 1',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14709&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 2',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14438&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 3',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14526&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 4',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14307&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 5',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14807&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
    ],
  },
};

export const Localised = () => <Component />;

export const WithCustomOffscreenText = () => (
  <Component offScreenText="Watch Live" />
);

export const WithChildren = ({ text: headline }: Props) => (
  <Heading level={3}>
    <Promo.A href="https://www.bbc.co.uk/ws/languages">
      <Component className="first-promo">{headline}</Component>
    </Promo.A>
  </Heading>
);
