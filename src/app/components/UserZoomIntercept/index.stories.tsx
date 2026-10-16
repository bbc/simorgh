import UserZoomIntercept, { UserZoomInterceptProps } from '.';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import readme from './README.md';
import metadata from './metadata.json';

const Component = ({ trigger }: UserZoomInterceptProps) => (
  <RequestContextProvider
    pageType="article"
    service="pidgin"
    pathname="/pathname"
  >
    <UserZoomIntercept trigger={trigger} />
  </RequestContextProvider>
);

export default {
  title: 'Components/UserZoomIntercept',
  component: UserZoomIntercept,
  parameters: {
    docs: { readme },
    metadata,
  },
  args: {
    trigger: 'immediate',
  },
  argTypes: {
    trigger: {
      control: { type: 'select' },
      options: ['immediate', 'view', 'click'],
    },
  },
};

export const Immediate = Component;
