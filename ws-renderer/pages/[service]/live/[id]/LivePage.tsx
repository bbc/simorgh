/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useRouter } from 'next/router';
import Heading from '../../../../../src/app/components/Heading';
import { Services, Variants } from '../../../../../src/app/models/types/global';

import styles from './styles';

type ComponentProps = {
  pageData: {
    metadata: string;
  };
  service: Services;
  variant?: Variants;
};

const LivePage = ({ pageData, service, variant }: ComponentProps) => {
  const { asPath } = useRouter();

  return (
    <main css={styles.wrapper}>
      <Heading level={1}>Test Next.JS Page</Heading>
      <pre css={styles.code}>
        <ul>
          <li>Service: {service}</li>
          <li>Variant: {!variant ? `${service} has no variant` : variant}</li>
          <li>Path: {asPath}</li>
        </ul>
      </pre>
      <pre css={styles.code}>{JSON.stringify(pageData, null, 2)}</pre>
    </main>
  );
};

export default LivePage;
