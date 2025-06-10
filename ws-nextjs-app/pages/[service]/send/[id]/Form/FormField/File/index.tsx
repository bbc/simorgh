/** @jsx jsx */
import { ChangeEvent, useContext, useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import { useLiveRegionContext } from '#app/components/LiveRegion/LiveRegionContext';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Label from '../FieldLabel';
import { InputProps, FileData } from '../../../types';
import { useFormContext } from '../..';
import styles from './styles';
import { UploadSvg } from './svgs';
import FileList from './FileList';
import InvalidMessageBox from '../../../MessageBox/InvalidMessageBox';
import fallbackTranslations from '../../../fallbackTranslations';

export default ({
  id,
  name,
  inputState,
  label,
  hasAttemptedSubmit,
}: InputProps) => {
  const {
    translations: {
      ugc: {
        fileUploadButton = fallbackTranslations.fileUploadButton,
        fileUploadLiveRegionText = fallbackTranslations.fileUploadLiveRegionText,
        fileUploadListHeading = fallbackTranslations.fileUploadListHeading,
      } = {},
    },
  } = useContext(ServiceContext);

  const { handleChange } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const { replaceLiveRegionWith } = useLiveRegionContext();

  const {
    isValid,
    required,
    wasInvalid,
    hasNestedErrorLabel,
    messageCode,
    min,
    max,
    fileTypes,
  } = inputState ?? {};

  const filesInState = inputState.value as FileData[];
  const timeoutRef = useRef<number | null | NodeJS.Timeout>(null);
  const labelId = `label-${id}`;
  const errorBoxId = `${id}-error`;

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

    let liveRegionText = fileUploadLiveRegionText;

    const duplicateFileNameCheck = (
      file: File,
      ogFileName: string,
      fileNameCount = 1,
    ): File => {
      const newFile = new File(
        [file],
        fileNameCount > 1 ? `${ogFileName} (${fileNameCount})` : file.name,
        {
          type: file.type,
          lastModified: file.lastModified,
        },
      );

      if (
        uploaded.some(uploadedFile => {
          return newFile.name === uploadedFile.file.name;
        })
      ) {
        return duplicateFileNameCheck(newFile, ogFileName, fileNameCount + 1);
      }

      return newFile;
    };

    chosenFiles.forEach(file => {
      const checkedFile = duplicateFileNameCheck(file, file.name);
      uploaded.push({ file: checkedFile } as FileData);
      liveRegionText = `${liveRegionText}${checkedFile.name}, `;
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

  return (
    <>
      <Label
        required={required}
        forId={id}
        id={labelId}
        useErrorTheme={false}
        labelText={label}
      />
      <button
        aria-describedby={labelId}
        css={[styles.fileUploadButton, styles.focusIndicatorInput]}
        type="button"
        onClick={() => handleUploadClick()}
      >
        <UploadSvg />
        {fileUploadButton}
      </button>
      {hasFiles && (
        <Text as="p" fontVariant="sansRegular" size="bodyCopy">
          {fileUploadListHeading}
        </Text>
      )}
      {!hasNestedErrorLabel && hasAttemptedSubmit && !isValid && (
        <InvalidMessageBox
          id={errorBoxId}
          suffix={label}
          messageCode={messageCode}
          hasArrowStyle={false}
          validationCriteria={{ min, max, fileTypes }}
        />
      )}
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
          ...(!isValid && { 'aria-describedby': errorBoxId }),
        })}
        css={styles.fileInput}
      />

      {hasFiles && (
        <FileList
          files={filesInState}
          name={name}
          hasAttemptedSubmit={hasAttemptedSubmit}
          validation={{ min, max, fileTypes }}
        />
      )}
    </>
  );
};
