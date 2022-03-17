/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Paragraph from '@bbc/psammead-paragraph';
import { Headline } from '@bbc/psammead-headings';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import ContentAnchor from './index';

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledImage = styled.img`
  display: block;
`;

const images = [
  'https://ichef.bbci.co.uk/onesport/cps/976/cpsprodpb/258B/production/_109811690_kipchoge_getty-2.jpg',
  'https://ichef.bbci.co.uk/images/ic/976xn/p07qg05f.jpg',
  'https://ichef.bbci.co.uk/images/ic/976xn/p07qwrp5.jpg',
  'https://ichef.bbci.co.uk/images/ic/976xn/p07qp4wh.jpg',
  'https://ichef.bbci.co.uk/images/ic/640x360/p07qyt0y.jpg',
  'https://ichef.bbci.co.uk/images/ic/976xn/p06lbtff.jpg',
  'https://ichef.bbci.co.uk/images/ic/640x360/p07qwn4h.jpg',
];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const ImageTicker = ({ delay }) => {
  const [width, setWidth] = useState(400);
  const [count, setCount] = useState(getRandomInt(0, 8));

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth(getRandomInt(200, 400));
      setCount(previousCount => {
        const nextCount = previousCount + 1;
        return nextCount < images.length ? nextCount : 0;
      });
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return <StyledImage width={width} src={images[count]} alt="Eliud Kipchoge" />;
};

const StyledFigure = styled.figure`
  border: solid #ccc 1px;
  padding: 16px;
  text-align: center;
`;
const StyledCaption = styled.figcaption`
  padding-top: 12px;
`;
const Gallery = ({ script, service, delay = 6000 }) => (
  <StyledFigure>
    <ContentAnchor initialHeight={200} initialWidth={400}>
      <ImageTicker delay={delay} />
    </ContentAnchor>
    <StyledCaption>
      <Paragraph script={script} service={service}>
        Eliud Kipchoge
      </Paragraph>
    </StyledCaption>
  </StyledFigure>
);

const renderParagraphs = ({ text, script, service }) =>
  Array(3).fill(
    <Paragraph script={script} service={service}>
      {Array(5).fill(`${text} `)}
    </Paragraph>,
  );

storiesOf('Components/ContentAnchor', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob({ defaultService: 'swahili' }))
  .add(
    'article with 1 wrapped dynamic resize component',
    ({ text, script, service }) => {
      return (
        <Wrapper>
          <Headline script={script} service={service}>
            {text}
          </Headline>
          {renderParagraphs({ text, script, service })}
          <Gallery script={script} service={service} />
          {Array(2).fill(renderParagraphs({ text, script, service }))}
        </Wrapper>
      );
    },
    { notes, chromatic: { disable: true } },
  )
  .add(
    'article with multiple dynamic resize components',
    ({ text, script, service }) => {
      return (
        <Wrapper>
          <Headline script={script} service={service}>
            {text}
          </Headline>
          {renderParagraphs({ text, script, service })}
          <Gallery script={script} service={service} />
          {renderParagraphs({ text, script, service })}
          <Gallery script={script} service={service} />
          {Array(3).fill(renderParagraphs({ text, script, service }))}
          <Gallery script={script} service={service} />
          <Gallery script={script} service={service} />
          {Array(4).fill(renderParagraphs({ text, script, service }))}
        </Wrapper>
      );
    },
    { notes, chromatic: { disable: true } },
  )
  .add(
    'article with multiple time-staggered dynamic resize components',
    ({ text, script, service }) => {
      return (
        <Wrapper>
          <Headline script={script} service={service}>
            {text}
          </Headline>
          {renderParagraphs({ text, script, service })}
          <Gallery delay={4000} script={script} service={service} />
          {renderParagraphs({ text, script, service })}
          <Gallery delay={3000} script={script} service={service} />
          {Array(3).fill(renderParagraphs({ text, script, service }))}
          <Gallery delay={2000} script={script} service={service} />
          <Gallery delay={1000} script={script} service={service} />
          {Array(4).fill(renderParagraphs({ text, script, service }))}
        </Wrapper>
      );
    },
    { notes, chromatic: { disable: true } },
  )
  .add(
    'multiple time-staggered dynamic resize components',
    ({ script, service }) => {
      return (
        <Wrapper>
          <Gallery delay={1000} script={script} service={service} />
          <Gallery delay={4000} script={script} service={service} />
          <Gallery delay={9000} script={script} service={service} />
          <Gallery delay={4000} script={script} service={service} />
          <Gallery delay={7000} script={script} service={service} />
          <Gallery delay={2000} script={script} service={service} />
          <Gallery delay={3000} script={script} service={service} />
          <Gallery delay={2000} script={script} service={service} />
          <Gallery delay={5000} script={script} service={service} />
          <Gallery delay={9000} script={script} service={service} />
          <Gallery delay={8000} script={script} service={service} />
          <Gallery delay={2000} script={script} service={service} />
          <Gallery delay={6000} script={script} service={service} />
          <Gallery delay={8000} script={script} service={service} />
          <Gallery delay={3000} script={script} service={service} />
          <Gallery delay={2000} script={script} service={service} />
        </Wrapper>
      );
    },
    { notes, chromatic: { disable: true } },
  );
