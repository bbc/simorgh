/**
 * Global page-state class applied to <html> and <body> while the media player
 * is in (fake) fullscreen. It acts as a shared signal that any component can
 * react to in its own styles, so the media player never needs to reach across
 * component boundaries into another component's DOM.
 */

const PLAYER_FULLSCREEN_CLASS = 'simorgh-player-fullscreen';

export default PLAYER_FULLSCREEN_CLASS;
