import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { render } from '@testing-library/react';
import WithVariant from '.';
import { frontPagePath } from '#app/routes/regex';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
  // eslint-disable-next-line react/prop-types
  Redirect: ({ to: { pathname } }) => <p>You are going to {pathname}</p>,
}));

describe('WithVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <h1>This is the BBC.</h1>;
  const WithVariantHOC = WithVariant(Component);

  const getMatchProps = (service, path = null) => ({
    path: path || frontPagePath,
    params: {
      service,
    },
  });

  describe('service with no default variant', () => {
    beforeEach(() => {
      const service = 'news';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    const match = getMatchProps('news');

    it('should not redirect', () => {
      const { container } = render(<WithVariantHOC match={match} />);

      expect(container.innerHTML).toEqual(`<h1>This is the BBC.</h1>`);
    });
  });

  describe('service (ukchina) with default variant', () => {
    beforeEach(() => {
      const service = 'ukchina';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    const match = getMatchProps('ukchina');

    it('should not redirect to ukchina/simp', () => {
      const { container } = render(<WithVariantHOC match={match} />);

      expect(container.innerHTML).toEqual(
        `<p>You are going to /ukchina/simp</p>`,
      );
    });
  });

  describe('service (zhongwen) with default variant', () => {
    beforeEach(() => {
      const service = 'zhongwen';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    const match = getMatchProps('zhongwen');

    it('should not redirect to zhongwen/simp', () => {
      const { container } = render(<WithVariantHOC match={match} />);

      expect(container.innerHTML).toEqual(
        `<p>You are going to /zhongwen/simp</p>`,
      );
    });
  });

  describe('service (serbian) with default variant', () => {
    beforeEach(() => {
      const service = 'serbian';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    const match = getMatchProps('serbian');

    it('should not redirect to serbian/lat', () => {
      const { container } = render(<WithVariantHOC match={match} />);

      expect(container.innerHTML).toEqual(
        `<p>You are going to /serbian/lat</p>`,
      );
    });
  });
});
