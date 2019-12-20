import React from 'react';

export const dropdownTestId = 'dropdown';
export const scrollableTestId = 'scrollable-list';

export const scrollableListItems = (
  <ul data-testid={scrollableTestId}>
    <li>List Items</li>
  </ul>
);

export const dropdownListItems = (
  <div data-testid={dropdownTestId}>Dropdown</div>
);
