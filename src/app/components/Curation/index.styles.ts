const styles = {
  billboardContainer: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.QUADRUPLE}rem`,
      marginBottom: `${spacings.QUADRUPLE}rem`,
      position: 'relative',
      zIndex: 1,
    }),
};

export default styles;
