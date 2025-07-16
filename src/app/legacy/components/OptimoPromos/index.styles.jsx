export const ContentWrapper = ({ children, ...props }) => (
  <div className="p-single group-2:py-double group-2:px-single group-3:p-double" {...props}>
    {children}
  </div>
);

export const PromoWrapper = ({ children, ...props }) => (
  <div className="relative bg-white dark:bg-grey-3 h-full" {...props}>
    {children}
  </div>
);
