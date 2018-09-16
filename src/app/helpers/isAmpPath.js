const AMP_PATH_REGEX = /\/articles\/:id\.amp$/;

const isAmpPath = path => AMP_PATH_REGEX.test(path);

export default isAmpPath;
