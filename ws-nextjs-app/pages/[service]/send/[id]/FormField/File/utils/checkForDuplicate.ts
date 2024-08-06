import { FileData } from '../../../types';

type CheckerObjType = {
  [key: string]: number;
};

export default (files: FileData[], liveRegionText: string) => {
  const checkerObj = {} as CheckerObjType;
  const noDupFiles: { file: File }[] = [];
  const existingDups: string[] = [];
  let updatedLiveRegionText = '';
  files.forEach(fileData => {
    const { file } = fileData;
    checkerObj[file.name.replace(/\s*\(\d+\)/g, '')] =
      (checkerObj[file.name.replace(/\s*\(\d+\)/g, '')] || 0) + 1;
  });

  files.forEach((fileData, index) => {
    const { file } = fileData;
    const numOfOccurrences = checkerObj[file.name];
    if (numOfOccurrences > 1 && index > 0 && existingDups.includes(file.name)) {
      const newFileName = `${file.name} (${numOfOccurrences})`;
      const newFile = new File([file], newFileName, { type: file.type });
      noDupFiles.push({ file: newFile });
      checkerObj[file.name] -= 1;
      updatedLiveRegionText = `${liveRegionText}${newFile.name}`;
    } else {
      existingDups.push(file.name);
      noDupFiles.push({ file });
      updatedLiveRegionText = `${liveRegionText}${file.name}`;
    }
  });
  return { noDupFiles, updatedLiveRegionText };
};
