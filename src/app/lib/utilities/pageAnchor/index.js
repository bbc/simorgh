import onClient from '../onClient';

const urlWithPageAnchor = () => (onClient() ? window.location.hash : false);

export default urlWithPageAnchor;
