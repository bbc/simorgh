import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { frontPagePath } from '#routes/utils/regex';
import { render } from '../../../../components/react-testing-library-with-providers';
import WithVariant from '.';

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
  };
});

describe('WithVariant', () => {
  const Component = ({ service }) => <p>This is BBC {service}</p>;
  const ComponentWithVariantRedirect = WithVariant(Component);

  const getMatchProps = (service, path = null) => ({
    path: path || frontPagePath,
    params: {
      service,
    },
  });

  describe('services without variants', () => {
    it.each`
      service
      ${'news'}
      ${'uzbek'}
    `('should render the /$service page', ({ service }) => {
      const match = getMatchProps(service);

      const { queryByText } = render(
        <MemoryRouter initialEntries={[`/${service}`]}>
          <Route path="/:service">
            <ComponentWithVariantRedirect match={match} service={service} />
          </Route>
        </MemoryRouter>,
      );

      expect(queryByText(`This is BBC ${service}`).toBeInTheDocument);
      expect(queryByText(`Redirected to ${service}`)).not.toBeInTheDocument();
    });
  });

  describe('services with default variants', () => {
    it.each`
      service       | redirect
      ${'serbian'}  | ${'/serbian/lat'}
      ${'ukchina'}  | ${'/ukchina/simp'}
      ${'zhongwen'} | ${'/zhongwen/simp'}
    `(
      'should redirect from /$service to $redirect',
      ({ service, redirect }) => {
        const match = getMatchProps(service);

        const { queryByText } = render(
          <MemoryRouter initialEntries={[`/${service}`]}>
            <Route path="/:service">
              <ComponentWithVariantRedirect match={match} service={service} />
            </Route>
          </MemoryRouter>,
        );

        expect(queryByText(`This is BBC ${service}`)).not.toBeInTheDocument();
        expect(queryByText(`Redirected to ${redirect}`)).toBeInTheDocument();
      },
    );
  });
});
