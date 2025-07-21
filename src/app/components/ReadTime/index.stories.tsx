import React from "react";
import ReadTime from "."; 
import readme from './README.md';



const Component = () => {  return (
    <ReadTime readTimeValue={1} />
  );
}  

export default {
  title: 'Components/ReadTime',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const Example = () => <Component />;