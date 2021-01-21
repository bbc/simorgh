const encodeChunkFilename = ({ url: chunkUrl }) => {
  const pathParts = chunkUrl.split('/'); // Split full url at each `/`
  const fileName = pathParts.pop(); // Feth the content after the last `/`
  const encodedFileName = encodeURIComponent(fileName); // Encode the filename

  return pathParts.join('/').concat(`/${encodedFileName}`); // reconstruct the full url with the encoded filename
};

export default encodeChunkFilename;
