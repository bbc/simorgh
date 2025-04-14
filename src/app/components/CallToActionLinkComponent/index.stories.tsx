import React from 'react';
import CallToActionLink from '.';

export default {
  title: 'Components/Call To Action Link',
  parameters: {},
};

export const ExampleWithChevronAlignedWithText = () => {
  return (
    <CallToActionLink url="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text>Hello</CallToActionLink.Text>
      <CallToActionLink.Chevron />
    </CallToActionLink>
  );
};

export const ExampleWithChevronAlignedWithTextchevInside = () => {
  return (
    <CallToActionLink url="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text>
        Hello <CallToActionLink.Chevron />
      </CallToActionLink.Text>
    </CallToActionLink>
  );
};

export const ExampleWithoutChevronAlignedWithText = () => {
  return (
    <CallToActionLink url="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text>Hello</CallToActionLink.Text>
    </CallToActionLink>
  );
};

export const ExampleWithFlexAndChevronInTextAndOverrideInteractionStyles =
  () => {
    return (
      <CallToActionLink url="https://www.bbc.com/ws/languages">
        <CallToActionLink.ButtonLikeWrapper>
          <CallToActionLink.Text overrideInteractionStyles size="brevier">
            Hello
            <CallToActionLink.Chevron size="brevier" />
          </CallToActionLink.Text>
        </CallToActionLink.ButtonLikeWrapper>
      </CallToActionLink>
    );
  };
