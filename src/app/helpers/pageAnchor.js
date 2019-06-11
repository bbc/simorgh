import onClient from './onClient';

const hasPageAnchor = () => (onClient() ? window.location.hash : false);

export default hasPageAnchor;
