import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithRouter = component => {
  return render(component, { wrapper: BrowserRouter });
};

export default renderWithRouter;
