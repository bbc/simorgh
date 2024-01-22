import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
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
        name: 'Group 0',
        type: 'figma',
        url: 'https://www.figma.com/file/ozHsWG5R9tETw6lBOU740V/Live-mvp-header---handover?type=design&node-id=95-266',
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
export const RightToLeftWithLiveLabel = ({ service, variant }: StoryProps) => (
  <Component
    title="نااہلی کی مدت میں ترمیم: ’نواز شریف کی قیادت میں اسی سال ترقی کا سفر دوبارہ شروع ہوگا‘"
    description="سینیٹ نے الیکشن ایکٹ میں ترمیم کا بل کثرت رائے سے منظور کیا ہے جس کے مطابق جہاں آئین میں نااہلی کی مدت کا تعین نہیں وہاں نااہلی پانچ سال سے زیادہ نہیں ہو گی۔ وزیر داخلہ رانا ثنا اللہ کا کہنا ہے کہ نواز شریف کی قیادت میں 'اسی سال ترقی کا سفر دوبارہ شروع ہوگا۔' جبکہ سینیٹ میں اپوزیشن لیڈر شہزاد وسیم نے اسے 'ایک فرد سے متعلق قانون سازی' قرار دیا ہے۔"
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
export const RightToLeftWithoutLiveLabel = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="نااہلی کی مدت میں ترمیم: ’نواز شریف کی قیادت میں اسی سال ترقی کا سفر دوبارہ شروع ہوگا‘"
    description="سینیٹ نے الیکشن ایکٹ میں ترمیم کا بل کثرت رائے سے منظور کیا ہے جس کے مطابق جہاں آئین میں نااہلی کی مدت کا تعین نہیں وہاں نااہلی پانچ سال سے زیادہ نہیں ہو گی۔ وزیر داخلہ رانا ثنا اللہ کا کہنا ہے کہ نواز شریف کی قیادت میں 'اسی سال ترقی کا سفر دوبارہ شروع ہوگا۔' جبکہ سینیٹ میں اپوزیشن لیڈر شہزاد وسیم نے اسے 'ایک فرد سے متعلق قانون سازی' قرار دیا ہے۔"
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

export const RightToLeftWithLiveLabelandImage = ({
  service,
  variant,
}: StoryProps) => (
  <Component
    title="نااہلی کی مدت میں ترمیم: ’نواز شریف کی قیادت میں اسی سال ترقی کا سفر دوبارہ شروع ہوگا‘"
    description="سینیٹ نے الیکشن ایکٹ میں ترمیم کا بل کثرت رائے سے منظور کیا ہے جس کے مطابق جہاں آئین میں نااہلی کی مدت کا تعین نہیں وہاں نااہلی پانچ سال سے زیادہ نہیں ہو گی۔ وزیر داخلہ رانا ثنا اللہ کا کہنا ہے کہ نواز شریف کی قیادت میں 'اسی سال ترقی کا سفر دوبارہ شروع ہوگا۔' جبکہ سینیٹ میں اپوزیشن لیڈر شہزاد وسیم نے اسے 'ایک فرد سے متعلق قانون سازی' قرار دیا ہے۔"
    showLiveLabel
    service={service}
    variant={variant}
    imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
    imageWidth={660}
  />
);
