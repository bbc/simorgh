import { Helmet } from 'react-helmet';
import { PropsWithChildren, use } from 'react';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Translations } from '#app/models/types/translations';
import { MediaType } from '#app/models/types/media';
import liteMediaIcons from './icons';
import loaderScript, {
  LOADER_ATTRIBUTE,
  LOADER_BUTTON_ATTRIBUTE,
} from './loaderScript';
import styles from './index.styles';

type MediaTypes = MediaType | 'image' | 'embed';

type ButtonTextProps = {
  type?: MediaTypes;
  liteSiteTranslations: Translations['liteSite'];
};

const getButtonText = ({ type, liteSiteTranslations }: ButtonTextProps) => {
  const { loadAudio, loadVideo, loadImage, loadMedia, loadEmbed } =
    liteSiteTranslations ?? {};

  switch (type) {
    case 'audio':
      return loadAudio || 'Load Audio';
    case 'video':
      return loadVideo || 'Load Video';
    case 'image':
      return loadImage || 'Load Image';
    case 'embed':
      return loadEmbed || 'Load Embed';
    default:
      return loadMedia || 'Load Media';
  }
};

type Props = {
  type?: MediaTypes;
  width?: number;
  height?: number;
};

const LiteMediaLoader = ({
  type,
  width,
  height,
  children,
}: PropsWithChildren<Props>) => {
  const {
    translations: { liteSite: liteSiteTranslations },
  } = use(ServiceContext);

  const hasFixedAspectRatio = type === 'image' && width && height;

  return (
    <div css={styles.wrapper} {...{ [LOADER_ATTRIBUTE]: '' }}>
      {/* Identical script tags are de-duplicated by Helmet, so this is only output once per page */}
      <Helmet script={[{ type: 'text/javascript', innerHTML: loaderScript }]} />
      <button
        type="button"
        css={[
          styles.liteMediaButtonOverlay,
          hasFixedAspectRatio && { aspectRatio: `${width}/${height}` },
        ]}
        {...{ [LOADER_BUTTON_ATTRIBUTE]: '' }}
      >
        <Text
          className="liteButtonText"
          css={styles.liteButtonText}
          fontVariant="sansBold"
        >
          <div css={styles.iconWrapper}>{type && liteMediaIcons[type]}</div>
          <span>{getButtonText({ type, liteSiteTranslations })}</span>
        </Text>
        <Text as="div">
          <Text size="brevier" css={styles.liteButtonInfoText}>
            {liteSiteTranslations?.loadMediaMessage ||
              'Loading this content will use more data'}
          </Text>
        </Text>
      </button>
      <template>{children}</template>
    </div>
  );
};

export default LiteMediaLoader;
