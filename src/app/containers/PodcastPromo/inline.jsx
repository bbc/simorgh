import React from 'react';
import styled from '@emotion/styled';
import isLive from '#lib/utilities/isLive';

const Prototype = styled.div`
  background: #f4f4f4;
  float: left;

  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ccc;
  text-transform: uppercase;
  line-height: 2;
  font-size: 20px;

  width: 115px;
  height: 370px;
  margin: 0 6px 6px 8px;

  @media (min-width: 320px) {
    width: 150px;
    height: 350px;
    margin: 0 8px 8px 8px;
  }
  @media (min-width: 360px) {
    width: 175px;
  }
  @media (min-width: 400px) {
    margin: 0 13.5px 8px 16px;
  }
  @media (min-width: 600px) {
    width: 275px;
    height: 425px;
  }
  @media (min-width: 1008px) {
    width: 300px;
    height: 550px;
    margin: 0 13.5px 8px 0px;
  }
`;

const PodcastPromoPrototype = () =>
  isLive() ? null : <Prototype>Podcast Promo</Prototype>;

export default PodcastPromoPrototype;
