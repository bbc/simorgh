/* eslint-disable react/no-danger */
import React from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeContainer = ({ href, id }) => {
  return (
    <GridItemConstrainedMedium>
      <div id={id} />
      <Helmet>
        <script
          type="text/javascript"
          src="https://pym.nprapps.org/pym.v1.min.js"
        />
        <script async type="text/javascript">
          {`(function(){
            var pymParent = new pym.Parent("${id}", "${href}", { id: "pym-${id}"});
            // could we always dynamically set the frame height ??
            document.getElementById("pym-${id}").height = 500;
          })();
          `}
        </script>
      </Helmet>
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  href: string.isRequired,
  id: string.isRequired,
};

export default IncludeContainer;
