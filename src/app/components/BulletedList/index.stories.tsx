import React, { PropsWithChildren } from 'react';

import { BulletedList, BulletedListItem } from '.';
import { StoryArgs } from '../../models/types/storybook';
import readme from './README.md';
import { POSTBOX } from '../ThemeProvider/palette';

interface Props {
  bulletPointShape?: string;
  bulletPointColour?: string;
  text?: string;
}

const innerListWithBulletedListItem = (text: string) => {
  return (
    <>
      <BulletedListItem>{text}</BulletedListItem>
      <BulletedListItem>
        {text} {text}
      </BulletedListItem>
      <BulletedListItem>{text.substring(0, 10)}</BulletedListItem>
      <BulletedListItem>
        {text} {text} {text} {text}
      </BulletedListItem>
    </>
  );
};

const innerList = (text: string) => {
  return (
    <>
      <li>{text}</li>
      <li>
        {text} {text}
      </li>
      <li>{text.substring(0, 10)}</li>
      <li>
        {text} {text} {text} {text}
      </li>
    </>
  );
};

const Component = ({
  bulletPointShape,
  bulletPointColour,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <BulletedList
      bulletPointColour={bulletPointColour}
      bulletPointShape={bulletPointShape}
    >
      {children}
    </BulletedList>
  );
};

export default {
  title: 'Components/BulletedList',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const DefaultStyles = (_: StoryArgs, globalArgs: Props) => {
  const { text } = globalArgs;
  return <Component>{innerListWithBulletedListItem(text as string)}</Component>;
};

export const RedSquareBullets = (_: StoryArgs, globalArgs: Props) => {
  const { text } = globalArgs;
  return (
    <Component bulletPointColour={POSTBOX} bulletPointShape="square">
      {innerListWithBulletedListItem(text as string)}
    </Component>
  );
};

export const HiddenBullets = (_: StoryArgs, globalArgs: Props) => {
  const { text } = globalArgs;
  return (
    <Component bulletPointShape="hidden">
      {innerListWithBulletedListItem(text as string)}
    </Component>
  );
};

export const WithoutBulletedListItems = (_: StoryArgs, globalArgs: Props) => {
  const { text } = globalArgs;
  return <Component>{innerList(text as string)}</Component>;
};
