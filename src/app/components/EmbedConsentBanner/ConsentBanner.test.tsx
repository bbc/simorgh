import { PropsWithChildren } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../ThemeProvider';

import ConsentBanner from './ConsentBanner';

// TODO: Get service from Global types
interface ContextProps {
  service?: string;
}

const mockCanonicalClickHandler = {
  onClick: jest.fn(() => null),
};

const mockAmpClickHandler = {
  on: 'tap:consentBanner.hide,embed.show',
};

const WithContext = ({
  children,
  service,
}: PropsWithChildren<ContextProps>) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      {children as JSX.Element}
    </ServiceContextProvider>
  </ThemeProvider>
);

describe('Embed Consent Banner', () => {
  it('should render a consent banner with correct content for Mundo service', async () => {
    let getByTestId!: (id: string) => HTMLElement;

    await act(async () => {
      ({ getByTestId } = render(
        <WithContext service="mundo">
          <ConsentBanner
            provider="youtube"
            clickHandler={mockCanonicalClickHandler}
          />
        </WithContext>,
      ));
    });

    const heading = getByTestId('banner-heading');
    const body = getByTestId('banner-body');

    expect(heading.textContent).toEqual('¿Permitir el contenido de YouTube?');
    expect(body.textContent).toEqual(
      "Este artículo contiene contenido proporcionado por YouTube. Solicitamos tu permiso antes de que algo  se cargue, ya que ese sitio  puede estar usando cookies y otras tecnologías. Es posible que quieras leer política de cookies y política de privacidad de YouTube antes de aceptar. Para ver este contenido, selecciona 'aceptar y continuar'.",
    );
  });

  it('should render a consent banner with correct amount of anchor tags for Mundo service', async () => {
    let container!: HTMLElement;

    await act(async () => {
      ({ container } = render(
        <WithContext service="mundo">
          <ConsentBanner
            provider="youtube"
            clickHandler={mockCanonicalClickHandler}
          />
        </WithContext>,
      ));
    });

    const anchorTags = container.querySelectorAll('a');

    expect(anchorTags.length).toBe(2);
  });

  it('should render a consent banner with default content for a service with no translations', async () => {
    let getByTestId!: (id: string) => HTMLElement;

    await act(async () => {
      ({ getByTestId } = render(
        <WithContext service="archive">
          <ConsentBanner
            provider="youtube"
            clickHandler={mockCanonicalClickHandler}
          />
        </WithContext>,
      ));
    });

    const heading = getByTestId('banner-heading');
    const body = getByTestId('banner-body');

    expect(heading.textContent).toEqual('Allow YouTube content?');
    expect(body.textContent).toEqual(
      "This article contains content provided by YouTube.  We ask for your permission before anything is loaded, as they may be using cookies and other technologies.  You may want to read Google's cookie policy and privacy policy before accepting. To view this content choose 'accept and continue'.",
    );
  });

  it('should trigger "onClick" event when banner button is clicked in canonical', async () => {
    let getByTestId!: (id: string) => HTMLElement;

    await act(async () => {
      ({ getByTestId } = render(
        <WithContext service="mundo">
          <ConsentBanner
            provider="youtube"
            clickHandler={mockCanonicalClickHandler}
          />
        </WithContext>,
      ));
    });

    const button = getByTestId('banner-button');

    fireEvent.click(button);

    expect(mockCanonicalClickHandler.onClick).toHaveBeenCalledTimes(1);
  });

  it('should render AMP "on" action when passed AMP action handler', async () => {
    let getByTestId!: (id: string) => HTMLElement;

    await act(async () => {
      ({ getByTestId } = render(
        <WithContext service="mundo">
          <ConsentBanner
            provider="youtube"
            clickHandler={mockAmpClickHandler}
          />
        </WithContext>,
      ));
    });

    const button = getByTestId('banner-button');

    expect(button).toHaveAttribute('on');
    expect(button.getAttribute('on')).toEqual(mockAmpClickHandler.on);
  });
});
