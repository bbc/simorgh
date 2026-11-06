import AudioWaveform from '.';
import readme from './README.md';
import metadata from './metadata.json';

export default {
  title: 'Components/AudioWaveform',
  component: AudioWaveform,
  parameters: { docs: { readme }, metadata },
};

export const Prototype = () => (
  <div data-e2e="on-demand-image">
    Enable audioWaveform=1 on the preview iframe URL. Live analysis requires a
    playing media element.
    <AudioWaveform />
  </div>
);
