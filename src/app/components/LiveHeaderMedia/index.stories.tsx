/* eslint-disable camelcase */
/** @jsx jsx */
import { css, jsx, Theme } from '@emotion/react';
import mundoLiveFixture from '#data/mundo/live/c7dkx155e626t.json';
import LiveHeaderMedia from '.';
import { MediaCollection } from '../MediaLoader/types';
import metadata from './metadata.json';

type Props = {
  warnings: {
    warning_text: string;
    warning: {
      warning_code: string;
      short_description: string;
    }[];
  };
};

export const Component = ({ warnings }: Props) => {
  const fixtureData = mundoLiveFixture.data.mediaCollections;
  fixtureData[0].model.version.warnings = warnings;

  return (
    <div css={({ palette }: Theme) => css({ background: palette.BLACK })}>
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />
    </div>
  );
};

const l1Warning = {
  warning_text: 'Contains some upsetting scenes.',
  warning: [
    {
      warning_code: 'L1',
      short_description: 'Some upsetting scenes',
    },
  ],
};

export const ComponentWithGuidance = () => <Component warnings={l1Warning} />;

export default {
  title: 'Components/LiveHeaderMedia',
  Component,
  parameters: {
    metadata,
  },
};
