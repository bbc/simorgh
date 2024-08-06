import { FileData } from '../../../types';

type CheckerObjType = {
  [key: string]: number;
};

export default (files: FileData[], text: string) => {
  const frequencyTracker = {} as CheckerObjType;
  const uploadedNoDuplicates: { file: File }[] = [];
  const existingFileNames: string[] = [];
  let liveRegionText = '';

  files.forEach(fileData => {
    const { file } = fileData;
    const baseName = file.name.replace(/\s*\(\d+\)/g, '');
    frequencyTracker[baseName] = (frequencyTracker[baseName] || 0) + 1;
  });

  files.forEach((fileData, index) => {
    const { file } = fileData;
    const numOfOccurrences = frequencyTracker[file.name];
    if (
      numOfOccurrences > 1 &&
      index > 0 &&
      existingFileNames.includes(file.name)
    ) {
      const newFileName = `${file.name} (${numOfOccurrences})`;
      const newFile = new File([file], newFileName, { type: file.type });
      uploadedNoDuplicates.push({ file: newFile });
      frequencyTracker[file.name] -= 1;
      liveRegionText = `${text}${newFile.name}`;
    } else {
      existingFileNames.push(file.name);
      uploadedNoDuplicates.push({ file });
      liveRegionText = `${text}${file.name}`;
    }
  });
  return { uploadedNoDuplicates, liveRegionText };
};
