// Inlined (rather than the shared external SVG icons) so that rendering a
// load button on the Lite site doesn't cost an extra network request per icon.
const svgAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  focusable: 'false',
  'aria-hidden': true,
} as const;

const videoIcon = (
  <svg viewBox="0 0 12 12" width="12" height="12" {...svgAttributes}>
    <path d="M2.144.96v11.28l8.712-5.64z" />
  </svg>
);

const audioIcon = (
  <svg viewBox="0 0 13 12" width="13" height="12" {...svgAttributes}>
    <path d="M9.021 1.811l-.525.525c.938.938 1.5 2.25 1.5 3.675s-.563 2.738-1.5 3.675l.525.525c1.05-1.087 1.725-2.55 1.725-4.2s-.675-3.112-1.725-4.2z" />
    <path d="M10.596.199l-.525.562c1.35 1.35 2.175 3.225 2.175 5.25s-.825 3.9-2.175 5.25l.525.525c1.5-1.462 2.4-3.525 2.4-5.775s-.9-4.312-2.4-5.812zM6.996 1.511l-2.25 2.25H.996v4.5h3.75l2.25 2.25z" />
  </svg>
);

const imageIcon = (
  <svg viewBox="0 0 32 26" width="16" height="13" {...svgAttributes}>
    <path d="M9,2V0H4V2H0V26H32V2ZM6.5,10A2.5,2.5,0,1,1,9,7.52,2.5,2.5,0,0,1,6.5,10ZM20,23a9,9,0,1,1,9-9A9,9,0,0,1,20,23Z" />
    <circle cx="20" cy="14.02" r="5.5" />
  </svg>
);

const embedIcon = (
  <svg viewBox="0 0 32 32" width="12" height="12" {...svgAttributes}>
    <path d="m17.1 6.6-4.6 18.2 2.3.6 4.6-18.2zM2.4 17.2l8-8-1.8-1.8L0 16l8.5 8.6 1.8-1.8-7.9-8zm27.2-2.3-7.9 8 1.8 1.8L32 16l-8.6-8.6-1.8 1.8 8 8z" />
  </svg>
);

const liteMediaIcons = {
  video: videoIcon,
  audio_video: videoIcon,
  audio: audioIcon,
  liveRadio: audioIcon,
  image: imageIcon,
  embed: embedIcon,
};

export type LiteMediaIconType = keyof typeof liteMediaIcons;

export default liteMediaIcons;
