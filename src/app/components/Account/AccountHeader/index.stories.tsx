import AccountHeader from '.';
import BrandContainer from '#app/legacy/containers/Brand';
import metadata from './metadata.json';
import readme from './README.md';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';

export default {
  title: 'Account/AccountHeader',
  component: AccountHeader,
  globals: {
    service: { service: 'hindi', variant: 'default' },
    idctaConfig: { ...mockIdctaConfig, isSignedIn: false },
  },
  parameters: { metadata, docs: { readme } },
};

const Container = () => (
  <BrandContainer>
    <AccountHeader />
  </BrandContainer>
);

export const SignedOut = () => <Container />;
export const SignedIn = () => <Container />;

SignedIn.globals = {
  idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
};
