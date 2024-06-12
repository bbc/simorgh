/** @jsx jsx */
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import Text from '#app/components/Text';
import { useLiveRegionContext } from '#app/components/LiveRegion/LiveRegionContext';
import Label from '../FieldLabel';
import { InputProps } from '../../types';
import { useFormContext } from '../../FormContext';
import styles from './styles';
import {
  AUDIO_SVG_DATA_URI,
  DOCUMENT_SVG_DATA_URI,
  DeleteSvg,
  UploadSvg,
  VIDEO_SVG_DATA_URI,
} from './svgs';

interface FileListProps {
  files: File[];
  name: string;
}

interface handleFileDeletionParams {
  fileIndex: number;
  fileName: string;
}

const FileList = ({ files, name }: FileListProps) => {
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
    replaceLiveRegionWith(`Removed ${fileName}`);
  };

  useEffect(() => {
    Promise.all(
      files.map(async file => {
        return new Promise(resolve => {
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

  const listItems = files.map((file: File, index: number) => {
    const key = `${index}-${file.name}`;
    const thumbnailSrc = thumbnailState[index];
    const isThumbnailSvg = thumbnailSrc?.startsWith('data:image/svg');
    const ariaDescribedById = `file-list-item-${index}`;

    return (
      <li css={styles.fileListItem} key={key}>
        <div css={styles.fileThumbnailContainer}>
          <img
            css={
              isThumbnailSvg ? styles.fileThumbnailSvg : styles.fileThumbnailImg
            }
            src={`${thumbnailSrc}`}
            alt=""
          />
        </div>
        <span id={ariaDescribedById}>{file.name}</span>
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
      </li>
    );
  });
  return (
    <>
      {/* Needs translation */}
      <Text as="p" fontVariant="sansRegular" size="bodyCopy">
        Here&apos;s what you&apos;re sending:
      </Text>
      <ul css={styles.fileList}>{listItems}</ul>
    </>
  );
};

export default ({
  id,
  name,
  inputState,
  describedBy,
  label,
  hasAttemptedSubmit,
}: InputProps) => {
  const { isValid, required, wasInvalid } = inputState ?? {};
  const { handleChange } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const filesInState = inputState.value as File[];
  const { replaceLiveRegionWith } = useLiveRegionContext();
  const timeoutRef = useRef<number | null | NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current as number);
    };
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Converts FileList to an actual array
    const chosenFiles = Array.prototype.slice.call(
      event.target.files,
    ) as File[];
    const uploaded = [...filesInState];

    // Needs translation
    let liveRegionText = `Update, Here's what you're sending: `;
    chosenFiles.forEach(file => {
      uploaded.push(file);
      liveRegionText = `${liveRegionText}${file.name}, `;
    });

    handleChange(name, uploaded);
    // Adds 1s delay for MacOS file explorer to bring focus back to browser, so VoiceOver can pickup the DOM change in time
    timeoutRef.current = setTimeout(
      () => replaceLiveRegionWith(liveRegionText),
      1000,
    );
  };

  const handleUploadClick = () => {
    if (inputRef?.current === null) return;
    inputRef.current.click();
    inputRef.current.value = '';
  };

  const fileArrayLength = filesInState.length;
  const hasFiles = fileArrayLength !== 0;
  const labelId = `${id}-label`;

  return (
    <>
      <Label id={labelId} required={required}>
        {label}
      </Label>
      <button
        aria-describedby={labelId}
        css={styles.fileUploadButton}
        type="button"
        onClick={() => handleUploadClick()}
      >
        <UploadSvg />
        Choose a file
      </button>
      <input
        id={id}
        name={name}
        type="file"
        onChange={event => event.target.files && handleFileChange(event)}
        ref={inputRef}
        multiple
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && { 'aria-required': required }),
          ...(!isValid && { 'aria-describedby': describedBy }),
        })}
        css={styles.fileInput}
      />
      {hasFiles && <FileList files={filesInState} name={name} />}
    </>
  );
};
