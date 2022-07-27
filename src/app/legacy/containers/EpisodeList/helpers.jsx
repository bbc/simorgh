import React, { forwardRef } from 'react';

// Used to make props passed to <EpisodeList> available to children
export const EpisodeContext = React.createContext({});
export const withEpisodeContext = Component =>
  forwardRef((props, ref) => (
    <EpisodeContext.Consumer>
      {context => <Component {...context} {...props} ref={ref} />}
    </EpisodeContext.Consumer>
  ));
