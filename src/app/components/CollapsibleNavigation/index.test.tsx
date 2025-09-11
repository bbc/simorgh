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
      { id: 'link1', label: 'Link 1', href: '#link1', lang: 'en' },
      { id: 'link2', label: 'Link 2', href: '#link2', lang: 'en' },
    ],
  },
  {
    id: 'section2',
    title: 'Section 2',
    links: [{ id: 'link3', label: 'Link 3', href: '#link3', lang: 'en' }],
  },
  {
    id: 'section3',
    title: 'Homepage',
    href: '/home',
    links: [{ id: 'link1', label: 'Link 1', href: '#link1', lang: 'en' }],
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
});
