/** @jsx jsx */
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { jsx } from '@emotion/react';
import { FieldData, InputProps } from '../types';
import { useFormContext } from '../FormContext';
import styles from './styles';

const UploadSvg = () => (
  <svg
    css={styles.fileUploadIcon}
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.43125 1.35625V9.8H7.56875V1.35625H6.43125ZM13.5625 11.2875V8.6625H12.425V11.2875C12.425 12.1625 12.1625 12.425 11.2875 12.425H2.7125C1.8375 12.425 1.575 12.1625 1.575 11.2875V8.6625H0.4375V11.2875C0.4375 12.5125 0.525 13.5625 2.7125 13.5625H11.2438C13.475 13.5625 13.5625 12.5125 13.5625 11.2875ZM7.04375 2.05625L11.2 6.2125L11.9875 5.38125L7 0.4375L2.0125 5.425L2.84375 6.25625L7.04375 2.05625Z" />
  </svg>
);

const DeleteSvg = () => (
  <svg viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1215 0.5L8.5 7.12203L1.87797 0.5L0 2.37797L6.62203 9L0 15.622L1.8785 17.5L8.5 10.8785L15.1215 17.5L17 15.622L10.378 9L17 2.37797L15.1215 0.5Z"
    />
  </svg>
);

interface FileListProps {
  files: File[];
  name: string;
}

const FileList = ({ files, name }: FileListProps) => {
  const { setFormState } = useFormContext();
  const [thumbnailState, setThumbnailState] = useState<Blob[]>([]);

  const handleFileDeletion = (fileIndex: number) => {
    setFormState(prevState => {
      const filesClone = [...files];
      filesClone.splice(fileIndex, 1);
      const updatedState = {
        [name]: {
          ...prevState[name],
          value: [...filesClone],
        },
      };

      return { ...prevState, ...updatedState } as Record<string, FieldData>;
    });

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
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            resolve(fileReader.result);
          };
          fileReader.readAsDataURL(file);
        });
      }),
    ).then(result => setThumbnailState(result as SetStateAction<Blob[]>));
  }, [files]);

  const listItems = files.map((file: File, index: number) => {
    const key = `${index}-${file.name}`;
    const thumbnailSrc = thumbnailState[index];

    return (
      <li css={styles.fileListItem} key={key}>
        <div css={styles.fileThumbnailContainer}>
          <img src={`${thumbnailSrc}`} alt="" />
        </div>
        <span>{file.name}</span>
        <button type="button" onClick={() => handleFileDeletion(index)}>
          <DeleteSvg />
        </button>
      </li>
    );
  });
  return (
    <>
      <div>Here&apos;s what you&apos;re sending:</div>
      <ul css={styles.fileList}>{listItems}</ul>
    </>
  );
};

export default ({ id, name, inputState, describedBy }: InputProps) => {
  const { isValid, required } = inputState;
  const { setFormState } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const files = inputState.value as File[];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState(prevState => {
      const value = event.target.files;
      const fileArrayLength = value?.length;
      if (!fileArrayLength) return { ...prevState };

      const filesArray = [];

      for (let fileIndex = 0; fileIndex < fileArrayLength; fileIndex += 1) {
        const file = value?.item(fileIndex);
        if (file) filesArray.push(file);
      }

      const updatedState = {
        [name]: {
          ...prevState[name],
          value: [...(prevState[name].value as File[]), ...filesArray],
        },
      };

      return { ...prevState, ...updatedState };
    });
  };

  const handleUploadClick = () => {
    if (inputRef?.current === null) return;
    inputRef.current.click();
    inputRef.current.value = '';
  };

  const fileArrayLength = files.length;
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
      {hasFiles && <FileList files={files as File[]} name={name} />}
    </div>
  );
};
