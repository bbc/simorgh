const AMP_PATH_REGEX = /\/articles\/amp\/:id$/;

const isAmpPath = path => AMP_PATH_REGEX.test(path);

export default isAmpPath;
