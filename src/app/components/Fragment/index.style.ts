export default {
  italicStyle: ({ fontVariants }: Theme) =>
    css({
      ...fontVariants.sansRegularItalic,
      fontFamily: 'inherit',
      fontWeight: 'inherit',
    }),
};
