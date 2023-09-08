import { promises as fs, PathLike } from 'fs';

type LoadFiles = {
  caPath: PathLike;
  certChainPath: PathLike;
  keyPath: PathLike;
};

const loadFiles = ({ caPath, certChainPath, keyPath }: LoadFiles) =>
  Promise.all([
    fs.readFile(caPath, 'UTF-8' as BufferEncoding),
    fs.readFile(certChainPath, 'UTF-8' as BufferEncoding),
    fs.readFile(keyPath, 'UTF-8' as BufferEncoding),
  ]);

const getCert = async () => {
  const caPath = process.env.CA_PATH || '/etc/pki/tls/certs/ca-bundle.crt';
  const certChainPath =
    process.env.CERT_CHAIN_PATH || '/etc/pki/tls/certs/client.crt';
  const keyPath = process.env.KEY_PATH || '/etc/pki/tls/private/client.key';

  try {
    const [ca, certChain, key] = await loadFiles({
      caPath,
      certChainPath,
      keyPath,
    });

    if (!ca) throw new Error(`No valid CA Bundle found`);
    if (!certChain) throw new Error(`No valid Public Key Chain found`);
    if (!key) throw new Error(`No valid Private Key found`);

    return { ca, certChain, key };
  } catch (error) {
    throw new Error(`Error loading certificate: ${error}`);
  }
};

export default getCert;
