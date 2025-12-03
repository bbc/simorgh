import React from 'react';
import mundoLiveFixture from '#data/mundo/live/c7dkx155e626t.json';
import { MediaCollection } from '#app/components/MediaLoader/types';
import Header from '.';
import metadata from './metadata.json';

interface ComponentProps {
  title: string;
  description?: string;
  showLiveLabel: boolean;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  mediaCollections?: MediaCollection[] | null;
}

const Component = ({
  title,
  description,
  showLiveLabel,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  mediaCollections,
}: ComponentProps) => {
  return (
    <Header
      showLiveLabel={showLiveLabel}
      title={title}
      description={description}
      imageUrl={imageUrl}
      imageUrlTemplate={imageUrlTemplate}
      imageWidth={imageWidth}
      mediaCollections={mediaCollections}
    />
  );
};

export default {
  title: 'Components/LivePageHeader',
  Component,
  parameters: {
    metadata,
    design: [
      {
        name: 'Text Only Header',
        type: 'figma',
        url: 'https://www.figma.com/file/ozHsWG5R9tETw6lBOU740V/Live-mvp-header---handover?type=design&node-id=95-266',
      },
      {
        name: 'Header with Image',
        type: 'figma',
        url: 'https://www.figma.com/file/D9w5JGLOhznDlz5tHu3rH0/Live-mvp---Live-Topic-Header---handoff?type=design&node-id=104-7&mode=design&t=X5HOIIPSyAJjnBe7-0',
      },
    ],
  },
};

export const TitleOnlyWithLiveLabel = () => (
  <Component
    title="Prince Harry's hacking case against Mirror back in court"
    description=""
    showLiveLabel
  />
);
export const TitleAndDescriptionWithLiveLabel = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel
  />
);

export const TitleOnlyWithoutLiveLabel = () => (
  <Component
    title="Prince Harry's hacking case against Mirror back in court"
    description=""
    showLiveLabel={false}
  />
);
export const TitleAndDescriptionWithoutLiveLabel = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel={false}
  />
);

export const TitleAndDescriptionWithLiveLabelAndImage = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleAndDescriptionWithoutLiveLabelWithImage = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel={false}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleWithImage = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    showLiveLabel={false}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleWithLiveLabelAndImage = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    showLiveLabel
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleAndDescriptionWithLiveLabelAndImageExtraLongText = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan v v An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban v"
    showLiveLabel
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const WithLiveMediaStream = () => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    showLiveLabel
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
    mediaCollections={
      mundoLiveFixture.data.mediaCollections as MediaCollection[]
    }
  />
);
