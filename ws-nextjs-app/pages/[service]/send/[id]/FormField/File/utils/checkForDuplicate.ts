import { FileData } from '../../../types';

type CheckerObjType = {
  [key: string]: number;
};

export default (files: FileData[]) => {
  const checkerObj = {} as CheckerObjType;

  files.forEach(fileData => {
    const { file } = fileData;
    checkerObj[file.name] = (checkerObj[file.name] || 0) + 1;
  });

  return checkerObj;
};
