import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import LanguageNavigation from './index';

const languageSections = [
  {
    id: 'section1',
    title: 'Section 1',
    links: [
      { id: 'link1', label: 'Link 1', href: '#link1' },
      { id: 'link2', label: 'Link 2', href: '#link2' },
    ],
  },
  {
    id: 'section2',
    title: 'Section 2',
    links: [{ id: 'link3', label: 'Link 3', href: '#link3' }],
  },
];

describe('LanguageNavigation', () => {
  test('renders section titles', () => {
    render(<LanguageNavigation languageSections={languageSections} />);

    languageSections.forEach(section => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  test('clicking a section toggles dropdown', () => {
    render(<LanguageNavigation languageSections={languageSections} />);

    const sectionLink = screen.getByText('Section 1');
    fireEvent.click(sectionLink);

    expect(screen.getByText('Section 1')).toBeInTheDocument();

    languageSections[0].links?.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test('clicking the same section again closes the dropdown', () => {
    render(<LanguageNavigation languageSections={languageSections} />);

    const sectionLink = screen.getByText('Section 1');
    fireEvent.click(sectionLink);
    fireEvent.click(sectionLink);

    expect(screen.queryByText('Link 1')).not.toBeInTheDocument();
  });

  test('clicking close button closes the dropdown', () => {
    render(<LanguageNavigation languageSections={languageSections} />);

    const sectionLink = screen.getByText('Section 1');
    fireEvent.click(sectionLink);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Link 1')).not.toBeInTheDocument();
  });

  test('renders links correctly when section is active', () => {
    render(<LanguageNavigation languageSections={languageSections} />);
    const sectionLink = screen.getByText('Section 2');
    fireEvent.click(sectionLink);

    languageSections[1].links?.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });
});
