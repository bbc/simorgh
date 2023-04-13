import React, { FC } from 'react';

interface UploaderProps {
  //   title: string;
  //   text: string;
  //   link: string;
  blocks: string;
}

const Uploader: FC<UploaderProps> = ({ blocks }) => {
  console.log('dataBlock', blocks);
  return (
    <>
      <span>Im an uploader</span>
    </>
  );
};

export default Uploader;
