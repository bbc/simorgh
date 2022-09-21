import WithPageWrapper from '../../src/app/legacy/containers/PageHandlers/withPageWrapper';
import { ServiceContextProvider } from '../../src/app/contexts/ServiceContext/index';
import { ToggleContextProvider } from '../../src/app/contexts/ToggleContext';
import Paragraph from '../../src/app/components/Paragraph';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';

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

const Wrapper = styled.div`
  max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  margin: 0 auto;
`;

const Home = ({ stream }) => {
  const Component = WithPageWrapper(() => (
    <Wrapper>
      {stream.data.map(({ fact }, index) => (
        <Paragraph css={css({ 'margin-bottom': GEL_SPACING_TRPL })} key={index}>
          {fact}
        </Paragraph>
      ))}
    </Wrapper>
  ));
  return (
    <ToggleContextProvider>
      <ServiceContextProvider service="mundo">
        <Component />
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default Home;
