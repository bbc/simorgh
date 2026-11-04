import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import AccountSignInModal from '.';

const onClose = jest.fn();

const renderComponent = (service: 'ws' | 'hindi' = 'ws') =>
  render(<AccountSignInModal onClose={onClose} />, {
    service,
    idctaConfig: mockIdctaConfig,
  });

describe('AccountSignInModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    {
      service: 'ws' as const,
      title: 'Sign in to follow topics',
      description:
        'Get straight to the news that interests you and never miss a story',
      saveDescription: 'Save stories and read them at your convenience',
    },
    {
      service: 'mundo' as const,
      title: 'Inicia sesión para seguir temas',
      description:
        'Accede directamente a las noticias que te interesan y no te pierdas ninguna historia',
      saveDescription: 'Guarda artículos y léelos cuando quieras',
    },
    {
      service: 'hindi' as const,
      title: 'टॉपिक्स फ़ॉलो करने के लिए साइन इन करें',
      description: 'अपनी रुचि की खबरें सीधे पाएं और कोई भी स्टोरी मिस न करें',
      saveDescription: 'स्टोरीज़ सेव करें और अपनी सुविधा से पढ़ें',
    },
    {
      service: 'portuguese' as const,
      title: 'Faça login para seguir tópicos',
      description:
        'Acesse diretamente as notícias do seu interesse e não perca nenhuma matéria.',
      saveDescription: 'Salve matérias e leia quando você quiser',
    },
  ])(
    'uses distinct follow-topic and save-article copy for $service',
    ({ service, title, description, saveDescription }) => {
      const { rerender } = render(
        <AccountSignInModal onClose={onClose} context="followTopic" />,
        { service, idctaConfig: mockIdctaConfig },
      );

      expect(screen.getByRole('dialog')).toHaveAccessibleName(title);
      expect(screen.getByText(description)).toBeInTheDocument();
      expect(screen.queryByText(saveDescription)).not.toBeInTheDocument();

      rerender(<AccountSignInModal onClose={onClose} />);

      expect(screen.getByText(saveDescription)).toBeInTheDocument();
      expect(screen.queryByText(description)).not.toBeInTheDocument();
    },
  );

  it('renders as a dialog', () => {
    renderComponent();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the sign-in link with the accessible label from translations', () => {
    renderComponent();

    const signInLink = screen.getByRole('link', {
      name: 'Sign in to My News',
    });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('hides the visual "Sign In" text from screen readers', () => {
    renderComponent();

    const signInLink = screen.getByRole('link', {
      name: 'Sign in to My News',
    });
    const ariaHiddenSpan = signInLink.querySelector('[aria-hidden="true"]');
    expect(ariaHiddenSpan).toBeInTheDocument();
    expect(ariaHiddenSpan).toHaveTextContent('Sign In');
  });

  it('renders the service-localised accessible label for hindi', () => {
    renderComponent('hindi');

    const signInLink = screen.getByRole('link', {
      name: 'माय न्यूज़ में साइन इन करें',
    });
    expect(signInLink).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    renderComponent();

    screen.getByRole('button', { name: /close/i }).click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
