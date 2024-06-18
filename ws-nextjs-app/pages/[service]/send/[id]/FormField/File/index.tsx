/** @jsx jsx */
import { ChangeEvent, useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import { useLiveRegionContext } from '#app/components/LiveRegion/LiveRegionContext';
import Text from '#app/components/Text';
import Label from '../FieldLabel';
import { InputProps, FileData } from '../../types';
import { useFormContext } from '../../FormContext';
import styles from './styles';
import { UploadSvg } from './svgs';
import FileList from './FileList';
import InvalidMessageBox from '../InvalidMessageBox';

export default ({
  id,
  name,
  inputState,
  describedBy,
  label,
  hasAttemptedSubmit,
}: InputProps) => {
  const { isValid, required, wasInvalid, hasNestedErrorLabel, messageCode } =
    inputState ?? {};
  const { handleChange } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const filesInState = inputState.value as FileData[];
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
      uploaded.push({ file } as FileData);
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
      <Label required={required} forId={id} id={labelId} useErrorTheme={false}>
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
      {/* Needs translation */}
      {hasFiles && (
        <Text as="p" fontVariant="sansRegular" size="bodyCopy">
          Here&apos;s what you&apos;re sending:
        </Text>
      )}
      {!hasNestedErrorLabel && hasAttemptedSubmit && !isValid && (
        <InvalidMessageBox
          id={labelId}
          messageCode={messageCode}
          hasArrowStyle={false}
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
          ...(!isValid && { 'aria-describedby': describedBy }),
        })}
        css={styles.fileInput}
      />

      {hasFiles && (
        <FileList
          files={filesInState}
          name={name}
          hasAttemptedSubmit={hasAttemptedSubmit}
        />
      )}
    </>
  );
};
