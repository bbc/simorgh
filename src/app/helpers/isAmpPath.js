const AMP_PATH_REGEX = /^\/news\/articles\/amp\/:id$/;

const isAmpPath = path => AMP_PATH_REGEX.test(path);

export default isAmpPath;
