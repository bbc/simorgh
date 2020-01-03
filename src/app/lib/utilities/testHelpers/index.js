import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithRouter = component => {
  return render(component, { wrapper: BrowserRouter });
};

export const assertFirstChildIsNull = container => {
  expect(container.firstChild).toBeNull();
};

export default renderWithRouter;
