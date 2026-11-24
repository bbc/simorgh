import type { Meta } from '@storybook/react-webpack5';
import Spinner from '.';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
};

export default meta;

export const Default = () => <Spinner />;

export const WithConsumerClass = () => <Spinner className="consumerSpinner" />;
