import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import ConsentBanner from './ConsentBanner';

const mockCanonicalClickHandler = {
  onClick: jest.fn(() => null),
};

const mockAmpClickHandler = {
  on: 'tap:consentBanner.hide,embed.show',
};

describe('Embed Consent Banner - Content', () => {
  it('should render a consent banner with correct content for Mundo service', () => {
    render(
      <ConsentBanner
        provider="youtube"
        clickHandler={mockCanonicalClickHandler}
      />,
      {
        service: 'mundo',
      },
    );

    const heading = screen.getByTestId('banner-heading');
    const body = screen.getByTestId('banner-body');

    expect(heading.textContent).toEqual(
      '¿Permitir el contenido de Google YouTube?',
    );
    expect(body.textContent).toEqual(
      "Este artículo contiene contenido proporcionado por Google YouTube. Solicitamos tu permiso antes de que algo  se cargue, ya que ese sitio  puede estar usando cookies y otras tecnologías. Es posible que quieras leer política de cookies y política de privacidad de Google YouTube antes de aceptar. Para ver este contenido, selecciona 'aceptar y continuar'.",
    );
  });

  it('should render a consent banner with correct amount of anchor tags for Mundo service', () => {
    const { container } = render(
      <ConsentBanner
        provider="youtube"
        clickHandler={mockCanonicalClickHandler}
      />,
      {
        service: 'mundo',
      },
    );

    const anchorTags = container.querySelectorAll('a');

    expect(anchorTags.length).toBe(2);
  });

  it('should render a consent banner with default content for a service with no translations', () => {
    render(
      <ConsentBanner
        provider="youtube"
        clickHandler={mockCanonicalClickHandler}
      />,
      {
        service: 'archive',
      },
    );

    const heading = screen.getByTestId('banner-heading');
    const body = screen.getByTestId('banner-body');

    expect(heading.textContent).toEqual('Allow Google YouTube content?');
    expect(body.textContent).toEqual(
      "This article contains content provided by Google YouTube.  We ask for your permission before anything is loaded, as they may be using cookies and other technologies.  You may want to read Google YouTube cookie policy and privacy policy before accepting. To view this content choose 'accept and continue'.",
    );
  });

  it('should render a TikTok consent banner with correct content for Mundo service', () => {
    render(
      <ConsentBanner
        provider="tiktok"
        clickHandler={mockCanonicalClickHandler}
      />,
      {
        service: 'mundo',
      },
    );

    const heading = screen.getByTestId('banner-heading');
    const body = screen.getByTestId('banner-body');

    expect(heading.textContent).toEqual('¿Permitir el contenido de TikTok?');
    expect(body.textContent).toEqual(
      "Este artículo contiene contenido proporcionado por TikTok. Solicitamos tu permiso antes de que algo  se cargue, ya que ese sitio  puede estar usando cookies y otras tecnologías. Es posible que quieras leer política de cookies y política de privacidad de TikTok antes de aceptar. Para ver este contenido, selecciona 'aceptar y continuar'.",
    );
  });

  it('should trigger "onClick" event when banner button is clicked in canonical', () => {
    render(
      <ConsentBanner
        provider="youtube"
        clickHandler={mockCanonicalClickHandler}
      />,
      {
        service: 'mundo',
      },
    );

    const button = screen.getByTestId('banner-button');

    fireEvent.click(button);

    expect(mockCanonicalClickHandler.onClick).toHaveBeenCalledTimes(1);
  });

  it('should render AMP "on" action when passed AMP action handler', () => {
    render(
      <ConsentBanner provider="youtube" clickHandler={mockAmpClickHandler} />,
      {
        service: 'mundo',
      },
    );

    const button = screen.getByTestId('banner-button');

    expect(button).toHaveAttribute('on');
    expect(button.getAttribute('on')).toEqual(mockAmpClickHandler.on);
  });
});
