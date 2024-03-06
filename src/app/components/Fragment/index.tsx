import React from 'react';
import Text from '../Text';

const getFontVariant = (attr: string[]) => {
  if (attr.includes('italic') && attr.includes('bold')) {
    return 'sansBoldItalic';
  }
  if (attr.includes('bold')) {
    return 'sansBold';
  }
  if (attr.includes('italic')) {
    return 'sansRegularItalic';
  }
  return 'sansRegular';
};

const Fragment = ({ text, attributes = [] }: FragmentProps) => {
  const fontVariant = getFontVariant(attributes);
  return <Text fontVariant={fontVariant}>{text}</Text>;
};

type FragmentProps = {
  text: string;
  attributes?: string[];
};

export default Fragment;
