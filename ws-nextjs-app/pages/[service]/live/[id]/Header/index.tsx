/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';

import MaskedImage from './MaskedImage';
import LiveLabelHeader from './LiveLabelHeader';
// import styles from './styles';

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
}) => {
  const isHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;

  const Title = <span>{title}</span>;

  return (
    <div>
      <div>
        <div />
      </div>
      <div>
        {isHeaderImage ? (
          <MaskedImage
            imageUrl={imageUrl}
            imageUrlTemplate={imageUrlTemplate}
            imageWidth={imageWidth}
          />
        ) : null}
        <div>
          <Heading size="trafalgar" level={1} id="content" tabIndex={-1}>
            {showLiveLabel ? (
              <LiveLabelHeader isHeaderImage={isHeaderImage}>
                {Title}
              </LiveLabelHeader>
            ) : (
              Title
            )}
          </Heading>
          {description && <Text as="p">{description}</Text>}
        </div>
      </div>
    </div>
  );
};

export default Header;
