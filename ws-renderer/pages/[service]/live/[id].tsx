import * as React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Paragraph from '../../../../src/app/components/Paragraph';
import applyBasicPageHandlers from '../../../../src/app/pages/utils/applyBasicPageHandlers';
import { Services } from '../../../../src/app/models/types/global';

const getStream = async () => {
  const res = await fetch(
    `https://catfact.ninja/facts?page=${Math.floor(Math.random() * 34) + 1}`,
  );
  const data = await res.json();

  return data;
};

type FactProps = {
  fact: string;
};

type ComponentProps = {
  stream: {
    data: FactProps[];
  };
  service: Services;
};

const LivePage = ({ stream, service }: ComponentProps) => {
  const Component = applyBasicPageHandlers({ addVariantHandling: true })(() => (
    <main>
      {stream.data.map(({ fact }: FactProps) => (
        <Paragraph key={fact}>{fact}</Paragraph>
      ))}
    </main>
  ));
  return <Component service={service} isNextJs />;
};

export default LivePage;

// TODO: revisit https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface PageParams extends ParsedUrlQuery {
  service: Services;
}

export const getStaticProps: GetStaticProps = async context => {
  const { service } = context.params as PageParams;
  const stream = await getStream();

  return { props: { stream, service }, revalidate: 60 };
};
