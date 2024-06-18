/** @jsx jsx */
import { SetStateAction, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { useLiveRegionContext } from '#app/components/LiveRegion/LiveRegionContext';
import { FileData, InvalidMessageCodes } from '../../../types';
import { useFormContext } from '../../../FormContext';
import styles from '../styles';
import {
  AUDIO_SVG_DATA_URI,
  DOCUMENT_SVG_DATA_URI,
  DeleteSvg,
  VIDEO_SVG_DATA_URI,
} from '../svgs';
import InvalidMessageBox from '../../InvalidMessageBox';

interface FileListProps {
  files: FileData[];
  name: string;
  hasAttemptedSubmit: boolean;
}

interface handleFileDeletionParams {
  fileIndex: number;
  fileName: string;
}

export default ({ files, name, hasAttemptedSubmit }: FileListProps) => {
  const { handleChange } = useFormContext();
  const [thumbnailState, setThumbnailState] = useState<string[]>([]);
  const { replaceLiveRegionWith } = useLiveRegionContext();

  const handleFileDeletion = ({
    fileIndex,
    fileName,
  }: handleFileDeletionParams) => {
    const filesClone = [...files];
    filesClone.splice(fileIndex, 1);
    handleChange(name, filesClone);

    setThumbnailState(prevState => {
      const thumbnailClone = [...prevState];
      thumbnailClone.splice(fileIndex, 1);

      return thumbnailClone;
    });

    // Needs translation
    replaceLiveRegionWith(`Update, removed ${fileName}`);
  };

  useEffect(() => {
    Promise.all(
      files.map(async fileData => {
        return new Promise(resolve => {
          const { file } = fileData;
          const fileType = file.type.substring(0, file.type.indexOf('/'));

          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            resolve(fileReader.result);
          };

          switch (fileType) {
            case 'image':
              fileReader.readAsDataURL(file);
              break;
            case 'video':
              resolve(VIDEO_SVG_DATA_URI);
              break;
            case 'audio':
              resolve(AUDIO_SVG_DATA_URI);
              break;
            default:
              resolve(DOCUMENT_SVG_DATA_URI);
              break;
          }
        });
      }),
    ).then(result => setThumbnailState(result as SetStateAction<string[]>));
  }, [files]);

  const listItems = files.map((fileData: FileData, index: number) => {
    const { file } = fileData;
    const key = `${index}-${file.name}`;
    const thumbnailSrc = thumbnailState[index];
    const isThumbnailSvg = thumbnailSrc?.startsWith('data:image/svg');
    const ariaDescribedById = `file-list-item-${index}`;
    const errorBoxAriaDescribedById = `error-box-${index}`;
    const showErrorBox = fileData.messageCode && hasAttemptedSubmit;

    return (
      <li css={styles.fileListItem} key={key}>
        <div css={styles.fileDetails}>
          <div css={styles.fileThumbnailContainer}>
            <img
              css={
                isThumbnailSvg
                  ? styles.fileThumbnailSvg
                  : styles.fileThumbnailImg
              }
              src={`${thumbnailSrc}`}
              alt=""
            />
          </div>
          <span
            id={ariaDescribedById}
            {...(showErrorBox && {
              'aria-describedby': errorBoxAriaDescribedById,
            })}
          >
            {file.name}
          </span>
          <button
            type="button"
            aria-describedby={ariaDescribedById}
            onClick={() =>
              handleFileDeletion({ fileIndex: index, fileName: file.name })
            }
          >
            <DeleteSvg />
            {/* Needs translation */}
            <VisuallyHiddenText>Remove</VisuallyHiddenText>
          </button>
        </div>

        {showErrorBox && (
          <InvalidMessageBox
            id={errorBoxAriaDescribedById}
            messageCode={fileData.messageCode as InvalidMessageCodes}
          />
        )}
      </li>
    );
  });
  return (
    <>
      <ul css={styles.fileList}>{listItems}</ul>
    </>
  );
};
