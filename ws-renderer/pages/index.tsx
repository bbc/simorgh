import * as React from 'react';
import Paragraph from '../../src/app/components/Paragraph';
import applyBasicPageHandlers from '../../src/app/pages/utils/applyBasicPageHandlers';

const getStream = async () => {
  const res = await fetch(
    `https://catfact.ninja/facts?page=${Math.floor(Math.random() * 34) + 1}`,
  );
  const data = await res.json();

  return data;
};

export async function getStaticProps() {
  const stream = await getStream();

  return { props: { stream }, revalidate: 60 };
}

type FactProps = {
  fact: string;
};

type StreamProps = {
  stream: {
    data: FactProps[];
  };
};

const Home = ({ stream }: StreamProps) => {
  const Component = applyBasicPageHandlers({ addVariantHandling: true })(() => (
    <main>
      {stream.data.map(({ fact }: FactProps) => (
        <Paragraph key={fact}>{fact}</Paragraph>
      ))}
    </main>
  ));
  return <Component service="mundo" isNextJs />;
};

export default Home;
