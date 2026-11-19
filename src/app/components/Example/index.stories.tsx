import Example, { ExampleProps } from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import readme from './README.md';
import metadata from './metadata.json';


const Component = ({ textToRender, renderAfter }: ExampleProps) => (
  <ServiceContextProvider service={'pidgin'}>
    <Example textToRender={textToRender} renderAfter={renderAfter} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/Example',
  component: Example,
  parameters: {
    docs: { readme },
    metadata,
  },
  args: {
    textToRender: 'Example Text',
    renderAfter: 1000,
  },
  argTypes: {
    renderAfter: {
      control: {
        type: 'select',
      },
      options: [1000, 2000, 3000, 4000],
    },
  },
};

export const ExampleHelloWorld = Component;