import React from 'react';
import CallToActionLink from '.';

export default {
  title: 'Components/Call To Action Link Component',
  parameters: {},
};

export const ExampleWithChevronAlignedWithText = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text>Hello</CallToActionLink.Text>
      <CallToActionLink.Chevron />
    </CallToActionLink>
  );
};

export const ExampleWithoutChevronAlignedWithText = () => {
  return (
    <CallToActionLink to="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text>Hello</CallToActionLink.Text>
    </CallToActionLink>
  );
};

export const ExampleWithFlexAndChevronInTextAndOverrideInteractionStyles =
  () => {
    return (
      <CallToActionLink to="https://www.bbc.com/ws/languages">
        <CallToActionLink.FlexWrapper>
          <CallToActionLink.Text
            overrideInteractionStyles
            size="brevier"
            fontVariant="sansBold"
          >
            Hello
            <CallToActionLink.Chevron />
          </CallToActionLink.Text>
        </CallToActionLink.FlexWrapper>
      </CallToActionLink>
    );
  };
