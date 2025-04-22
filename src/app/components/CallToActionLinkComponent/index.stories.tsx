import React from 'react';
import CallToActionLink from '.';
import readme from './README.md';

export default {
  title: 'Components/Call To Action Link',
  parameters: {
    docs: { readme },
  },
};

export const WithChevronInsideText = () => {
  return (
    <CallToActionLink url="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text>Call to Action Link</CallToActionLink.Text>
      <CallToActionLink.Chevron />
    </CallToActionLink>
  );
};

export const WithChevronOutsideTextAndUnderline = () => {
  return (
    <div>
      <CallToActionLink url="https://www.bbc.com/ws/languages">
        <CallToActionLink.Text shouldUnderlineOnHoverFocus>
          Call to Action Link <CallToActionLink.Chevron />
        </CallToActionLink.Text>
      </CallToActionLink>
    </div>
  );
};

export const WithoutChevron = () => {
  return (
    <CallToActionLink url="https://www.bbc.com/ws/languages" alignWithMargin>
      <CallToActionLink.Text>Call to Action Link</CallToActionLink.Text>
    </CallToActionLink>
  );
};

export const WithButtonLikeWrapperAndChevronOutsideTextAndUnderline = () => {
  return (
    <CallToActionLink url="https://www.bbc.com/ws/languages" size="brevier">
      <CallToActionLink.ButtonLikeWrapper>
        <CallToActionLink.Text shouldUnderlineOnHoverFocus>
          Call to Action Link
        </CallToActionLink.Text>
        <CallToActionLink.Chevron />
      </CallToActionLink.ButtonLikeWrapper>
    </CallToActionLink>
  );
};
