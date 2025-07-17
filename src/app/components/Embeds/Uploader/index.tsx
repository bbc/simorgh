import React from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import CallToActionLink from '#app/components/CallToActionLink';
import Paragraph from '../../Paragraph';
import Text from '../../Text';
import idSanitiser from '../../../lib/utilities/idSanitiser';

interface UploaderProps {
  blocks?: object[];
}

type UploaderBlock = {
  type: 'title' | 'text' | 'link';
  model: {
    blocks: object[];
  };
};

const Uploader = ({ blocks }: UploaderProps) => {
  if (!blocks?.length) return null;

  const type = path([0, 'type'], blocks); // aresUploader
  if (type !== 'aresUploader') return null;

  const uploaderBlocks = pathOr<UploaderBlock[]>(
    [],
    [0, 'model', 'blocks'],
    blocks,
  );

  const titleBlock = uploaderBlocks.find(block => block.type === 'title');
  const textBlock = uploaderBlocks.find(block => block.type === 'text');
  const linkBlock = uploaderBlocks.find(block => block.type === 'link');

  const title = pathOr<string>(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    titleBlock,
  );

  const text = pathOr<string>(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    textBlock,
  );

  const linkText = pathOr<string>(
    '',
    [
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'text',
    ],
    linkBlock,
  );

  const linkAddress = pathOr<string>(
    '',
    [
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'locator',
    ],
    linkBlock,
  );

  const id = idSanitiser(title);

  return (
    <section 
      role="region" 
      aria-labelledby={id} 
      className="my-triple mx-full group-2:mx-double group-4:mx-0"
    >
      <div className="bg-white p-double forced-colours:border-[0.1875rem] forced-colours:border-transparent">
        <Text as="strong" fontVariant="sansBold" size="paragon" id={id}>
          {title}
        </Text>
        <Paragraph className="pt-[0.75rem]">{text}</Paragraph>
        <div className="flex justify-start">
          <CallToActionLink 
            url={linkAddress} 
            className="p-[0.75rem_1rem] mt-double bg-grey-10 w-auto text-white hover:text-white focus:text-white"
          >
            <CallToActionLink.ButtonLikeWrapper>
              <CallToActionLink.Text shouldUnderlineOnHoverFocus>
                {linkText}
                <CallToActionLink.Chevron className="ms-[0.75rem]" />
              </CallToActionLink.Text>
            </CallToActionLink.ButtonLikeWrapper>
          </CallToActionLink>
        </div>
      </div>
    </section>
  );
};

export default Uploader;
