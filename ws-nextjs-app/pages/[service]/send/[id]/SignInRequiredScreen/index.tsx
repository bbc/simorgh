import { use } from 'react';
import CallToActionLink from '#app/components/CallToActionLink';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import fallbackTranslations from '../fallbackTranslations';

const SignInRequiredScreen = () => {
  const { signInUrl, registerUrl } = use(AccountContext);
  const {
    translations: {
      ugc: {
        signInRequiredHeading = fallbackTranslations.signInRequiredHeading,
        signInRequiredDescription = fallbackTranslations.signInRequiredDescription,
        signInRequiredSignIn = fallbackTranslations.signInRequiredSignIn,
        signInRequiredRegister = fallbackTranslations.signInRequiredRegister,
      } = {},
    },
  } = use(ServiceContext);

  return (
    <section aria-labelledby="sign-in-required-heading">
      <Heading level={1} id="sign-in-required-heading" size="trafalgar">
        {signInRequiredHeading}
      </Heading>
      <Paragraph>{signInRequiredDescription}</Paragraph>
      <Paragraph>
        <CallToActionLink url={signInUrl || ''}>
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {signInRequiredSignIn}
          </CallToActionLink.Text>
        </CallToActionLink>
        {registerUrl && (
          <>
            {' or '}
            <CallToActionLink url={registerUrl}>
              <CallToActionLink.Text shouldUnderlineOnHoverFocus>
                {signInRequiredRegister}
              </CallToActionLink.Text>
            </CallToActionLink>
          </>
        )}
      </Paragraph>
    </section>
  );
};

export default SignInRequiredScreen;
