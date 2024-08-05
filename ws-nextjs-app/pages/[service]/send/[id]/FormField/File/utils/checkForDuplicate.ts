export default (files: any[]) => {
  const checkerObj = {};
  const newArray: string[] = [];

  files.forEach(fileData => {
    const { file } = fileData;
    checkerObj[file.name] = (checkerObj[file.name] || 0) + 1;
  });

  Object.entries(checkerObj).forEach(([key, value]) => {
    if (value > 1) {
      newArray.push(key);
    }
  });

  return checkerObj;
};
