import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { RequestContextProvider } from '#contexts/RequestContext';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../../../../src/app/contexts/ServiceContext';
import { withServicesKnob } from '../../../../../../src/app/legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../../../../../src/app/components/ThemeProvider';
import Header from '.';
import { StoryProps } from '../../../../../../src/app/models/types/storybook';
import metadata from './metadata.json';

interface ComponentProps extends StoryProps {
  title: string;
  description?: string;
  showLiveLabel: boolean;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
}

const Component = ({
  service,
  variant,
  title,
  description,
  showLiveLabel,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
}: ComponentProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <RequestContextProvider
        isAmp={false}
        isApp={false}
        pageType={LIVE_PAGE}
        service={service}
        statusCode={200}
        pathname="/pathname"
        variant={variant}
      >
        <ServiceContextProvider service={service} variant={variant}>
          <Header
            showLiveLabel={showLiveLabel}
            title={title}
            description={description}
            imageUrl={imageUrl}
            imageUrlTemplate={imageUrlTemplate}
            imageWidth={imageWidth}
          />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/LivePageHeader',
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
  decorators: [withKnobs, withServicesKnob()],
};

export const TitleOnlyWithLiveLabel = ({ service, variant }: StoryProps) => (
  <Component
    title="Prince Harry's hacking case against Mirror back in court"
    description=""
    showLiveLabel
    service={service}
    variant={variant}
  />
);
export const TitleAndDescriptionWithLiveLabel = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel
    service={service}
    variant={variant}
  />
);

export const TitleOnlyWithoutLiveLabel = ({ service, variant }: StoryProps) => (
  <Component
    title="Prince Harry's hacking case against Mirror back in court"
    description=""
    showLiveLabel={false}
    service={service}
    variant={variant}
  />
);
export const TitleAndDescriptionWithoutLiveLabel = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel={false}
    service={service}
    variant={variant}
  />
);

export const TitleAndDescriptionWithLiveLabelAndImage = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel
    service={service}
    variant={variant}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleAndDescriptionWithoutLiveLabelWithImage = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban"
    showLiveLabel={false}
    service={service}
    variant={variant}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleWithImage = ({ service, variant }: StoryProps) => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    showLiveLabel={false}
    service={service}
    variant={variant}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleWithLiveLabelAndImage = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    showLiveLabel
    service={service}
    variant={variant}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);

export const TitleAndDescriptionWithLiveLabelAndImageExtraLongText = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan An kai wa jirgin kwashe yan Turkiyya hari a Sudan v v An kai wa jirgin kwashe yan Turkiyya hari a Sudan"
    description="Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban Wannan shaft ne da ke kawo muku laqbarai daga sassan duniya daban-daban v"
    showLiveLabel
    service={service}
    variant={variant}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);
