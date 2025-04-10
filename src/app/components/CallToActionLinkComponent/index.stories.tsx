import React from 'react';
import CallToActionLink from '.';

export default {
  title: 'Components/Call To Action Link Component',
  parameters: {},
};

export const Example = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages">
      <CallToActionLink.Text>Hello</CallToActionLink.Text>
      <CallToActionLink.Chevron />
    </CallToActionLink>
  );
};

export const ExampleChevronInTextAndOverrideInteractionStyles = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages">
      <CallToActionLink.Text overrideInteractionStyles>
        Hello
        <CallToActionLink.Chevron />
      </CallToActionLink.Text>
    </CallToActionLink>
  );
};

export const ExampleWithFlex = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages">
      <CallToActionLink.FlexWrapper>
        <CallToActionLink.Text>Hello</CallToActionLink.Text>
        <CallToActionLink.Chevron />
      </CallToActionLink.FlexWrapper>
    </CallToActionLink>
  );
};

export const ExampleWithFlexAndChevronInTextAndOverrideInteractionStyles =
  () => {
    return (
      <CallToActionLink to="https://www.bbc.com/ws/languages">
        <CallToActionLink.FlexWrapper>
          <CallToActionLink.Text overrideInteractionStyles>
            Hello
            <CallToActionLink.Chevron />
          </CallToActionLink.Text>
        </CallToActionLink.FlexWrapper>
      </CallToActionLink>
    );
  };

export const MessageBannerCTA = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages">
      <CallToActionLink.FlexWrapper>
        <CallToActionLink.Text
          size="pica"
          fontVariant="sansBold"
          overrideInteractionStyles
        >
          Hello
          <CallToActionLink.Chevron size="pica" />
        </CallToActionLink.Text>
      </CallToActionLink.FlexWrapper>
    </CallToActionLink>
  );
};
export const UploaderEmbedCTA = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages">
      <CallToActionLink.FlexWrapper>
        <CallToActionLink.Text
          size="pica"
          fontVariant="sansBold"
          overrideInteractionStyles
        >
          Hello
          <CallToActionLink.Chevron size="pica" />
        </CallToActionLink.Text>
      </CallToActionLink.FlexWrapper>
    </CallToActionLink>
  );
};
// purposefully removing flex and extra div
export const CanonicalToLiteSiteCTAWithChevron = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text size="brevier" fontVariant="sansBold">
        Hello
      </CallToActionLink.Text>
      <CallToActionLink.Chevron size="brevier" />
    </CallToActionLink>
  );
};
export const LiteSiteCTAWithChevron = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text size="brevier" fontVariant="sansBold">
        Hello
      </CallToActionLink.Text>
      <CallToActionLink.Chevron size="brevier" />
    </CallToActionLink>
  );
};
export const LiteSiteCTAWitoutChevron = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text size="brevier" fontVariant="sansRegular">
        Hello
      </CallToActionLink.Text>
    </CallToActionLink>
  );
};
