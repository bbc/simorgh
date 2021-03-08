import React from 'react';

// Used to make props passed to <EpisodeList> available to children
export const EpisodeContext = React.createContext({});
export const withEpisodeContext = Component => props => (
  <EpisodeContext.Consumer>
    {context => <Component {...context} {...props} />}
  </EpisodeContext.Consumer>
);
