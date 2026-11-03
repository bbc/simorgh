import { RequestContextProvider } from '#app/contexts/RequestContext';
import { PropsWithChildren } from 'react';
import readme from './README.md';
import metadata from './metadata.json';
import UserZoomViewIntercept, {
  UserZoomViewInterceptProps,
} from './UserZoomViewIntercept';
import UserZoomButtonIntercept from './UserZoomButtonIntercept';

const Component = ({ children }: PropsWithChildren) => (
  <RequestContextProvider
    pageType="article"
    service="pidgin"
    pathname="/pathname"
  >
    {children}
  </RequestContextProvider>
);

export default {
  title: 'Components/UserZoomIntercept',
  component: Component,
  parameters: {
    docs: { readme },
    metadata,
  },
  args: {
    trigger: 'view',
  },
  argTypes: {
    trigger: {
      control: { type: 'select' },
      options: ['immediate', 'view'],
    },
  },
};

export const ViewIntercept = ({ trigger }: UserZoomViewInterceptProps) => (
  <Component>
    <UserZoomViewIntercept trigger={trigger} />
  </Component>
);

export const ClickIntercept = () => (
  <Component>
    <UserZoomButtonIntercept />
  </Component>
);
