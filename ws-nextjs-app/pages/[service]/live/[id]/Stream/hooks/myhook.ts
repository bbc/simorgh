import { useEffect } from 'react';

const MyHook = (postId: string | null) => {
  console.log("I've called myHook with post", postId);
  useEffect(() => {
    if (postId) {
      const element = document.getElementById(postId);

      element?.scrollIntoView();
      (element as HTMLElement)?.focus();
    }
  }, [postId]);
};

export default MyHook;
