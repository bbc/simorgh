import React from 'react';
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
    render(<CollapsibleNavigation collapsibleNavigationSections={sections} />);

    sections.forEach(section => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  test('clicking a section toggles dropdown', () => {
    render(<CollapsibleNavigation collapsibleNavigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 1');

    fireEvent.click(sectionTitle);

    sections[0].links?.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test('clicking the same section again closes the dropdown', () => {
    render(<CollapsibleNavigation collapsibleNavigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 1');

    fireEvent.click(sectionTitle);

    fireEvent.click(sectionTitle);

    expect(screen.queryByText('Link 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Link 2')).not.toBeInTheDocument();
  });

  test('clicking close button closes the dropdown', () => {
    render(<CollapsibleNavigation collapsibleNavigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 1');

    fireEvent.click(sectionTitle);

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(screen.queryByText('Link 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Link 2')).not.toBeInTheDocument();
  });

  test('renders links correctly when section is active', () => {
    render(<CollapsibleNavigation collapsibleNavigationSections={sections} />);

    const sectionTitle = screen.getByText('Section 2');

    fireEvent.click(sectionTitle);

    sections[1].links?.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });
});
