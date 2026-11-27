import AudioWaveformDiagnostic from '.';
import readme from './README.md';
import metadata from './metadata.json';

export default {
  title: 'Components/AudioWaveformDiagnostic',
  component: AudioWaveformDiagnostic,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const WaitingForPlayer = () => (
  <div data-e2e="on-demand-image">
    Add audioWaveformDebug=1 to the preview iframe URL to enable the diagnostic.
    <AudioWaveformDiagnostic playerId="diagnostic-story-player" />
  </div>
);
