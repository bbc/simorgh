import React from 'react';
import { videoComponentPropTypes } from '../../models/propTypes';

const Video = ({ pid, kind, title, items, holdingImageUrl }) => (
  <div>
    <div>video pid: {pid}</div>
    <div>kind: {kind}</div>
    <div>title: {title}</div>
    <div>holdingImageURL: {holdingImageUrl}</div>
    <div>items: {JSON.stringify(items, null, 4)}</div>
  </div>
);

Video.propTypes = videoComponentPropTypes;

export default Video;
