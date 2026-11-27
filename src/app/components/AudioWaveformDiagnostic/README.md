# Audio waveform diagnostic

Temporary, read-only feasibility probe for podcast episode pages. Add
`audioWaveformDebug=1` to the page query string, then start playback using the
existing player. A diagnostic panel overlays the episode image and refreshes
every 500ms. Without the query parameter it renders nothing and does not poll.

The panel checks the registered player clock, Web Audio API availability, and
audio/video elements inside the player container, open shadow roots, and
accessible nested frames. Closed shadow roots are not inspected.
It reports inaccessible frames and errors without attempting to bypass browser
restrictions. A moving clock confirms timing access, not access to audio samples.
An accessible media element does not establish CORS permission for analysis.

No player settings, event handlers, audio routing, or playback are changed. No
media is fetched, recorded, or decoded, and no AudioContext is created. The panel
uses English diagnostic text deliberately, is not a production feature, and does
not announce its periodic updates to screen readers. It is absent in Lite mode
and is hidden wherever the episode image is hidden. Overlay positioning uses
`:has()`, requiring a modern browser.
