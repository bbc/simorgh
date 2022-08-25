import { css } from '@emotion/react';

const styles = {
  heading: () =>
    css({
      /*
       * margin: 0 is used to cancel the default spacing
       * above and below the component.
       * This is because we don't rely on one default spacing
       * for all paragraph elements.
       * Each use of this component will have to explicitly set
       * the spacings with the `css` prop.
       */
      margin: 0,
    }),
};

export default styles;
