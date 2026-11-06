# Live audio waveform prototype

Open a valid episode on the BBC-local development host:

`http://www.local.bbc.com:7081/mundo/podcasts/p0mhhs01?renderer_env=test&audioWaveform=1`

Start the podcast using its existing Play control. The image overlay starts
analysing automatically once playback begins, with no separate waveform button.
Desktop Chrome is the initial prototype target.
Browsers without `HTMLMediaElement.captureStream()` log an unsupported error.
The prototype is disabled unless `audioWaveform=1` is present.

The component locates native audio/video inside the player's open shadow DOM.
It captures the playing element's audio track and passes it through its own Web
Audio analyser. The canvas displays actual time-domain samples, not random bars
or a simulated waveform. It fills the image's own positioning wrapper, with a
transparent background and a white line with a dark shadow for contrast. There
is no visible text or separate control. The canvas appears during playback and
disappears immediately on pause or ending. Silence or restricted capture is logged after five seconds without
a measurable signal; these cannot reliably be distinguished.

The original media element's audio routing, playback, volume, event handlers,
and player settings are untouched. Only the captured stream is connected to a
zero-gain output to keep analysis processing without duplicate audible playback.
No microphone permission is requested, no second media download is started, and
no audio is recorded, stored, or sent elsewhere. Unmounting cancels
animation, stops captured tracks, and closes the prototype's audio context.

The waveform becomes flat when playback buffers or is muted. Amplitude
is scaled by the native media element's volume. Reduced-motion users
do not see the waveform, and canvas drawing is skipped. Changes to the device's
motion preference take effect immediately. Hidden tabs do not
draw. Newly discovered media elements connect automatically. Capture failures
are logged and exposed as a visually hidden status once per element rather than repeatedly attempting capture; reload
the page to retry. If a browser blocks automatic Web Audio startup, the waveform
cannot run there. The prototype does not bypass browser autoplay policy.
This uses undocumented player DOM structure and is not a production integration
contract. Capture permissions, DRM, and browser differences can still prevent
sample access even when playback works.

The overlay has no visible text and is
hidden wherever the existing episode image is hidden, including narrow screens
and Lite mode. Remove the query parameter to return to the normal page.
The separate `audioWaveformDebug=1` diagnostic remains available.
