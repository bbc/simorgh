import React from 'react';
import styled from 'styled-components';
import { videoComponentPropTypes } from '../../models/propTypes';

const MediaPlayerContainer = styled.div`
  height: 26em;
  width: 100%;
`;

const Video = ({
  id,
  pid,
  kind,
  title,
  items,
  holdingImageUrl,
  statsAppName,
  statsAppType,
  statsCountername,
  statsDestination,
  uiLocale,
}) => (
  <MediaPlayerContainer id={`${id}${pid}`}>
    <div>video pid: {pid}</div>
    <div>kind: {kind}</div>
    <div>title: {title}</div>
    <div>holdingImageURL: {holdingImageUrl}</div>
    <div>items: {JSON.stringify(items, null, 4)}</div>
    <div>statsAppName: {statsAppName}</div>
    <div>statsAppType: {statsAppType}</div>
    <div>statsCountername: {statsCountername}</div>
    <div>statsDestination: {statsDestination}</div>
    <div>uiLocale: {uiLocale}</div>
  </MediaPlayerContainer>
);

Video.propTypes = videoComponentPropTypes;

export default Video;
