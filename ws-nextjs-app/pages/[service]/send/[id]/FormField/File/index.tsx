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

const FileList = ({ files, name }: FileListProps) => {
  const { handleChange } = useFormContext();
  const [thumbnailState, setThumbnailState] = useState<string[]>([]);

  const handleFileDeletion = (fileIndex: number) => {
    const filesClone = [...files];
    filesClone.splice(fileIndex, 1);
    handleChange(name, filesClone);

    setThumbnailState(prevState => {
      const thumbnailClone = [...prevState];
      thumbnailClone.splice(fileIndex, 1);

      return thumbnailClone;
    });
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
          onClick={() => handleFileDeletion(index)}
        >
          <DeleteSvg />
          <VisuallyHiddenText>Remove</VisuallyHiddenText>
        </button>
      </li>
    );
  });
  return (
    <>
      <p css={styles.fileListParagraph}>
        Here&apos;s what you&apos;re sending:
      </p>
      <ul css={styles.fileList}>{listItems}</ul>
    </>
  );
};

export default ({ id, name, inputState, describedBy }: InputProps) => {
  const { isValid, required } = inputState;
  const { handleChange } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const filesInState = inputState.value as File[];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Converts FileList to an actual array
    const chosenFiles = Array.prototype.slice.call(
      event.target.files,
    ) as File[];
    const uploaded = [...filesInState];

    chosenFiles.forEach(file => {
      uploaded.push(file);
    });

    handleChange(name, uploaded);
  };

  const handleUploadClick = () => {
    if (inputRef?.current === null) return;
    inputRef.current.click();
    inputRef.current.value = '';
  };

  const fileArrayLength = filesInState.length;
  const hasFiles = fileArrayLength !== 0;

  return (
    <div>
      <button
        aria-describedby={name}
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
        aria-invalid={!isValid}
        aria-required={required}
        aria-describedby={describedBy}
        css={styles.fileInput}
      />
      {hasFiles && <FileList files={filesInState} name={name} />}
    </div>
  );
};
