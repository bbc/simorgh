declare namespace React.JSX {
  /*
   * AMP currently doesn't have built-in types for TypeScript.
   * As a workaround, custom types are declared manually.
   * See: https://stackoverflow.com/a/50601125
   */
  interface IntrinsicElements {
    'amp-state': React.PropsWithChildren<{
      id?: string;
    }>;
  }
}

declare namespace React {
  interface HTMLAttributes<T> {
    /**
     * AMP event handler attribute — used for AMP actions like `tap:element.toggleVisibility`.
     * See: https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events/
     */
    on?: string;
  }
}
