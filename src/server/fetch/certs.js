import { readFile } from 'fs/promises';

const fallbackCertPath = '/etc/pki/certificate.pem';

const load = async path => {
  let cert;
  try {
    cert = await readFile(path, 'UTF-8');
    return cert;
  } catch (error) {
    return '';
  }
};

const getCertPath = () => {
  const caPath = '/etc/pki/tls/certs/ca-bundle.crt';
  const certChainPath = '/etc/pki/tls/certs/client.crt';
  const keyPath = '/etc/pki/tls/private/client.key';

  return {
    caPath,
    certChainPath,
    keyPath,
  };
};

const getCert = async () => {
  const { caPath, certChainPath, keyPath } = getCertPath();

  const ca = await load(caPath);
  const certChain =
    (await load(certChainPath)) || (await load(fallbackCertPath));
  const key = await load(keyPath);

  return { ca, certChain, key, caPath, certChainPath, keyPath };
};

export default getCert;
