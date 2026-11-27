import Timestamp from '.';
import readme from './README.md';
import metadata from './metadata.json';

export default {
  title: 'Components/Timestamp',
  component: Timestamp,
  parameters: { docs: { readme }, metadata },
  args: {
    datetime: '2018-07-07',
    children: '7 July 2018',
    padding: true,
  },
};

export const Default = {};
export const WithoutPadding = { args: { padding: false } };
