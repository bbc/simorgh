import { Helmet } from 'react-helmet';
import { useId, PropsWithChildren, useContext } from 'react';
import Text from '#app/components/Text';
import { mediaIcons } from '#app/components/icons/shared';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Translations } from '#app/models/types/translations';
import { setImgSize } from '#nextjs/renderers/litePageTransforms/transformImgTags';
import { MediaType } from '#app/models/types/media';
import LiteButton from '../LiteButton';
import styles from './index.styles';

type MediaTypes = MediaType | 'image' | 'embed';

function script(this: Element) {
  const parentEl = this.parentElement;

  if (!parentEl) return;

  const templateEl = parentEl.querySelector('template');

  if (!templateEl) return;

  // Browser compatibility may be questionable with 'replaceWith'
  parentEl.replaceWith(templateEl.content.cloneNode(true));

  // parentEl.prepend(templateEl.content.cloneNode(true));
  // parentEl.removeChild(templateEl);
  // parentEl.removeChild(this);
}

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
  src?: string;
  showFileSize?: boolean;
};

const LiteMediaLoader = ({
  type,
  width,
  height,
  src,
  showFileSize = false,
  children,
}: PropsWithChildren<Props>) => {
  const dataId = useId();
  const {
    translations: { liteSite: liteSiteTranslations },
  } = useContext(ServiceContext);

  const hasFixedAspectRatio = type === 'image' && width && height;
  const shouldShowFileSize = showFileSize && type === 'image' && src;

  return (
    <div css={styles.wrapper}>
      {shouldShowFileSize && (
        <Helmet>
          <script>
            {`
            (async function() {
              var srcToUse = '${setImgSize(src)}';

              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', srcToUse, true);
              
              xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status === 200) {
                    var size = xhr.getResponseHeader('Content-Length');

                    var fileSizeInBytes = parseInt(size, 10);
                    var encodedBufferInBytes = 1000; 
                    var fileSizeInKB = Math.round((fileSizeInBytes  + encodedBufferInBytes) / 1024);
                    var srcEl = document.querySelector('[data-size-id="${dataId}"]');
                    
                    srcEl.textContent = "Approximately: " + fileSizeInKB + "KB";
                    srcEl.style.display = 'block';
                  }
                }
              };

              xhr.send(null);
            })();
          `}
          </script>
        </Helmet>
      )}
      <LiteButton
        css={[
          styles.liteMediaButtonOverlay,
          hasFixedAspectRatio && { aspectRatio: `${width}/${height}` },
        ]}
        script={script}
      >
        <Text
          className="liteButtonText"
          css={styles.liteButtonText}
          fontVariant="sansBold"
        >
          <div css={styles.iconWrapper}>
            {mediaIcons?.[type as keyof typeof mediaIcons]}
          </div>
          <span>{getButtonText({ type, liteSiteTranslations })}</span>
        </Text>
        <Text as="div">
          <Text size="brevier" css={styles.liteButtonInfoText}>
            {liteSiteTranslations?.loadMediaMessage ||
              'Loading this content will use more data'}
          </Text>
        </Text>
        {shouldShowFileSize && (
          <Text as="div">
            <Text
              data-size-id={dataId}
              size="brevier"
              fontVariant="sansRegularItalic"
              css={[styles.liteButtonInfoText, { display: 'none' }]}
            />
          </Text>
        )}
      </LiteButton>
      <template>{children}</template>
    </div>
  );
};

export default LiteMediaLoader;
