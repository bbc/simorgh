export const dropdownTestId = 'dropdown';
export const scrollableTestId = 'scrollable-nav';

export const scrollableListItems = (
  <ul data-testid={scrollableTestId}>
    <li>List Items</li>
  </ul>
);

export const dropdownListItems = (
  <ul data-testid={dropdownTestId}>
    <li>
      <a href="/item1">Item 1</a>
    </li>
    <li>
      <a href="/item2">Item 2</a>
    </li>
  </ul>
);
