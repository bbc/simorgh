const styles = {
  placeholderInfo: (isLite: boolean) => 
    `w-full text-minion font-sans-regular flex min-w-20 p-2 px-0.5 ${
      !isLite ? 'gel-3-only:p-2 gel-3-only:absolute gel-3-only:bg-white gel-3-only:max-w-[4.125rem] gel-3-only:h-10 gel-3-only:-translate-y-10 gel-3-only:[&_time]:m-auto gel-2-only:p-2 gel-2-only:absolute gel-2-only:bg-white gel-2-only:max-w-[4.125rem] gel-2-only:h-[2.125rem] gel-2-only:-translate-y-[2.125rem] gel-2-only:[&_time]:m-auto' : ''
    }`,
  time: (isLite: boolean) => 
    `text-grey-2 ${
      !isLite ? 'gel-2-only:text-ebon gel-3-only:text-ebon' : ''
    }`,
  promoMediaIndicator: (isLite: boolean) => 
    `[&_svg]:text-grey-2 [&_svg]:fill-current ${
      !isLite ? '[&_svg]:gel-2-only:text-ebon [&_svg]:gel-3-only:text-ebon' : ''
    }`,
};

export default styles;
