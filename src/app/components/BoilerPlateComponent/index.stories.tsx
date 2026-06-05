import HelloWorld, { BoilerPlateProps } from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import readme from './README.md';
import metadata from './metadata.json';



const Component = ({ textToRender }: BoilerPlateProps) => (
  <ServiceContextProvider service={'pidgin'}>
    <HelloWorld textToRender={textToRender} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/BoilerPlateComponent',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
  args: {
    textToRender: 'Example Text',
  },
};

export const ExampleBoilerPlateComponent = Component;