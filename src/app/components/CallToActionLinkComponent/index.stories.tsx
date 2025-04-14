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

export const ExampleWithFlexAndChevronInTextAndUnderline = () => {
  return (
    <CallToActionLink url="https://www.bbc.com/ws/languages" size="brevier">
      <CallToActionLink.ButtonLikeWrapper>
        <CallToActionLink.Text shouldUnderlineOnHoverFocus>
          Hello
        </CallToActionLink.Text>
        <CallToActionLink.Chevron />
      </CallToActionLink.ButtonLikeWrapper>
    </CallToActionLink>
  );
};
