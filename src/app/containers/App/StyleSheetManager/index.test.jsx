import React from 'react';
import { renderer } from 'react-test-renderer';
import StyledComponentsSheetManager from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

xdescribe('StyledComponentsSheetManager', () => {
  it('should use rtl plugin if service has rtl text direction', () => {
    renderer.create(
      <ServiceContextProvider>
        <StyledComponentsSheetManager />
      </ServiceContextProvider>,
    );
    // expect(x).toHaveProps();
  });

  it('should not use rtl plugin if service has ltr text direction', () => {});
});
