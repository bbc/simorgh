import { useRef } from 'react';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import UserZoomIntercept, { UserZoomInterceptProps } from '.';
import readme from './README.md';
import metadata from './metadata.json';

const Component = ({ trigger, targetRef }: UserZoomInterceptProps) => (
  <RequestContextProvider
    pageType="article"
    service="pidgin"
    pathname="/pathname"
  >
    <UserZoomIntercept trigger={trigger} targetRef={targetRef} />
  </RequestContextProvider>
);

export default {
  title: 'Components/UserZoomIntercept',
  component: UserZoomIntercept,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Immediate = () => <Component trigger="immediate" />;

export const View = () => <Component trigger="view" />;

export const Click = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={buttonRef} type="button">
        Give feedback
      </button>
      <Component trigger="click" targetRef={buttonRef} />
    </>
  );
};
