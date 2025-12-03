import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import CollapsibleNavigation from './index';

const sections = [
  {
    id: 'section1',
    title: 'Section 1',
    links: [
      { id: 'link1', label: 'Link 1', href: '#link1', lang: 'en' },
      { id: 'link2', label: 'Link 2', href: '#link2', lang: 'fr' },
    ],
  },
  {
    id: 'section2',
    title: 'Section 2',
    links: [{ id: 'link3', label: 'Link 3', href: '#link3' }],
  },
  {
    id: 'section3',
    title: 'Homepage',
    href: '/home',
    links: [{ id: 'link1', label: 'Link 1', href: '#link1' }],
  },
];

describe('LanguageNavigation', () => {
  test('renders section titles', () => {
    render(<CollapsibleNavigation navigationSections={sections} />);

    sections.forEach(section => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  test('clicking a section toggles dropdown', () => {
    render(<CollapsibleNavigation navigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 1');

    fireEvent.click(sectionTitle);

    sections[0].links?.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test('clicking the same section again closes the dropdown', () => {
    render(<CollapsibleNavigation navigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 1');

    fireEvent.click(sectionTitle);

    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();

    fireEvent.click(sectionTitle);

    expect(screen.queryByText('Link 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Link 2')).not.toBeInTheDocument();
  });

  test('clicking close button closes the dropdown', () => {
    render(<CollapsibleNavigation navigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 1');

    fireEvent.click(sectionTitle);

    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', {
      name: 'Close Section 1 submenu',
    });
    fireEvent.click(closeButton);

    expect(closeButton).not.toBeInTheDocument();
    expect(screen.queryByText('Link 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Link 2')).not.toBeInTheDocument();
  });

  test('renders links correctly when section is active', () => {
    render(<CollapsibleNavigation navigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 2');

    fireEvent.click(sectionTitle);

    sections[1].links?.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test('renders section as a link when href is present', () => {
    render(<CollapsibleNavigation navigationSections={sections} />);

    const sectionLink = screen.getByRole('link', { name: 'Homepage' });

    expect(sectionLink).toHaveAttribute('href', '/home');

    fireEvent.click(sectionLink);

    expect(screen.queryByText('Link 1')).not.toBeInTheDocument();
  });

  test('applies lang attribute to links when provided', () => {
    render(<CollapsibleNavigation navigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 1');
    fireEvent.click(sectionTitle);

    const link1 = screen.getByRole('link', { name: 'Link 1' });
    const link2 = screen.getByRole('link', { name: 'Link 2' });

    expect(link1).toHaveAttribute('lang', 'en');
    expect(link2).toHaveAttribute('lang', 'fr');
  });

  test('applies latinTransliteration as aria-label when provided', () => {
    const sectionsWithLatinTransliteration = [
      {
        id: 'section1',
        title: 'Section 1',
        links: [
          {
            id: 'link1',
            label: 'Link 1',
            href: '#link1',
            lang: 'ky',
            latinTransliteration: 'Kyrgyz tilindegi zhaniliktar',
          },
          {
            id: 'link2',
            label: 'Link 2',
            href: '#link2',
            lang: 'yo',
            latinTransliteration: 'Iroyin ni Yoruba',
          },
        ],
      },
    ];

    render(
      <CollapsibleNavigation
        navigationSections={sectionsWithLatinTransliteration}
      />,
    );

    const sectionTitle = screen.getByText('Section 1');
    fireEvent.click(sectionTitle);

    const link1 = screen.getByRole('link', {
      name: 'Kyrgyz tilindegi zhaniliktar',
    });
    const link2 = screen.getByRole('link', { name: 'Iroyin ni Yoruba' });

    expect(link1).toHaveAttribute('aria-label', 'Kyrgyz tilindegi zhaniliktar');
    expect(link2).toHaveAttribute('aria-label', 'Iroyin ni Yoruba');
  });

  test('applies both lang and latinTransliteration attributes together', () => {
    const sectionsWithBothAttributes = [
      {
        id: 'section1',
        title: 'Section 1',
        links: [
          {
            id: 'link1',
            label: 'Кыргыз тилиндеги жаңылыкта',
            href: '#link1',
            lang: 'ky',
            latinTransliteration: 'Kyrgyz tilindegi zhaniliktar',
          },
        ],
      },
    ];

    render(
      <CollapsibleNavigation navigationSections={sectionsWithBothAttributes} />,
    );

    const sectionTitle = screen.getByText('Section 1');
    fireEvent.click(sectionTitle);

    const link1 = screen.getByRole('link', {
      name: 'Kyrgyz tilindegi zhaniliktar',
    });

    expect(link1).toHaveAttribute('lang', 'ky');
    expect(link1).toHaveAttribute('aria-label', 'Kyrgyz tilindegi zhaniliktar');
  });

  test('does not apply lang attribute when not provided', () => {
    const sectionsWithoutLang = [
      {
        id: 'section1',
        title: 'Section 1',
        links: [
          {
            id: 'link1',
            label: 'Link 1',
            href: '#link1',
            // No lang attribute
          },
        ],
      },
    ];

    render(<CollapsibleNavigation navigationSections={sectionsWithoutLang} />);

    const sectionTitle = screen.getByText('Section 1');
    fireEvent.click(sectionTitle);

    const link1 = screen.getByRole('link', { name: 'Link 1' });

    expect(link1).not.toHaveAttribute('lang');
  });

  test('does not apply aria-label when latinTransliteration is not provided', () => {
    const sectionsWithoutLatinTransliteration = [
      {
        id: 'section1',
        title: 'Section 1',
        links: [
          {
            id: 'link1',
            label: 'Link 1',
            href: '#link1',
            lang: 'en',
            // No latinTransliteration
          },
        ],
      },
    ];

    render(
      <CollapsibleNavigation
        navigationSections={sectionsWithoutLatinTransliteration}
      />,
    );

    const sectionTitle = screen.getByText('Section 1');
    fireEvent.click(sectionTitle);

    const link1 = screen.getByRole('link', { name: 'Link 1' });

    expect(link1).toHaveAttribute('lang', 'en');
    expect(link1).not.toHaveAttribute('aria-label');
  });

  test('does not translate when disableTranslation provided', () => {
    const sectionsNotTranslate = [
      {
        id: 'section1',
        title: 'Section 1',
        links: [
          {
            id: 'link1',
            label: 'Link 1',
            href: '#link1',
            lang: 'en',
            disableTranslation: true,
          },
        ],
      },
    ];

    render(<CollapsibleNavigation navigationSections={sectionsNotTranslate} />);

    const sectionTitle = screen.getByText('Section 1');
    fireEvent.click(sectionTitle);

    const link1 = screen.getByRole('link', { name: 'Link 1' });

    expect(link1).toHaveAttribute('translate', 'no');
  });
});
