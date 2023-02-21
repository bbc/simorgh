import React from 'react';

export const dropdownTestId = 'dropdown';
export const scrollableTestId = 'scrollable-list';

export const scrollableListItems = (
  <ul data-testid={scrollableTestId}>
    <li>List Items</li>
  </ul>
);

export const dropdownListItems = (
  <ul data-testid={dropdownTestId}>
    <li>Dropdown Items</li>
  </ul>
);
