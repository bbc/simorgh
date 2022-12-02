/* eslint-disable no-console */
import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import SectionLabel from './index';

describe('SectionLabel', () => {
  describe('With bar', () => {
    describe('With plain title', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <SectionLabel
          script={latin}
          labelId="test-section-label"
          service="news"
        >
          This is text in a SectionLabel.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with explicitly showing the bar',
        <SectionLabel
          script={latin}
          labelId="test-section-label"
          bar
          service="news"
        >
          This is text in a SectionLabel, and there is a bar over to the right
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with mobileDivider set to false',
        <SectionLabel
          script={latin}
          labelId="test-section-label"
          mobileDivider={false}
          service="news"
        >
          This is text in a SectionLabel, and there is no mobile divider
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with explicit text direction',
        <SectionLabel
          script={latin}
          dir="ltr"
          labelId="test-section-label"
          service="news"
        >
          This is text in a SectionLabel rendering in ltr mode.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with arabic script typography values',
        <SectionLabel
          script={arabic}
          dir="rtl"
          labelId="test-section-label"
          service="persian"
        >
          بعض محتوى النص
        </SectionLabel>,
      );
    });

    describe('With linking title', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <SectionLabel
          script={latin}
          labelId="test-section-label"
          service="news"
          href="/igbo/other-index"
          linkText="See All"
        >
          This is text in a linking SectionLabel.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with explicitly showing the bar',
        <SectionLabel
          script={latin}
          labelId="test-section-label"
          bar
          service="news"
          href="/igbo/other-index"
          linkText="See All"
        >
          This is text in a SectionLabel, and there is a bar over to the right
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with explicit text direction',
        <SectionLabel
          script={latin}
          dir="ltr"
          labelId="test-section-label"
          service="news"
          href="/igbo/other-index"
          linkText="See All"
        >
          This is text in a SectionLabel rendering in ltr mode.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with arabic script typography values',
        <SectionLabel
          script={arabic}
          dir="rtl"
          labelId="test-section-label"
          service="persian"
          href="/igbo/other-index"
          linkText="See All"
        >
          بعض محتوى النص
        </SectionLabel>,
      );
    });
  });

  describe('Without bar', () => {
    describe('With plain title', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <SectionLabel
          script={latin}
          bar={false}
          labelId="test-section-label"
          service="news"
        >
          This is text in a SectionLabel.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with explicit text direction',
        <SectionLabel
          script={latin}
          dir="ltr"
          bar={false}
          labelId="test-section-label"
          service="news"
        >
          This is text in a SectionLabel rendering in ltr mode.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with arabic script typography values',
        <SectionLabel
          script={arabic}
          dir="rtl"
          bar={false}
          labelId="test-section-label"
          service="persian"
        >
          بعض محتوى النص
        </SectionLabel>,
      );
    });

    describe('With linking title', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <SectionLabel
          script={latin}
          bar={false}
          labelId="test-section-label"
          service="news"
          href="/igbo/other-index"
          linkText="See All"
        >
          This is text in a SectionLabel.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with explicit text direction',
        <SectionLabel
          script={latin}
          dir="ltr"
          bar={false}
          labelId="test-section-label"
          service="news"
          href="/igbo/other-index"
          linkText="See All"
        >
          This is text in a SectionLabel rendering in ltr mode.
        </SectionLabel>,
      );

      shouldMatchSnapshot(
        'should render correctly with arabic script typography values',
        <SectionLabel
          script={arabic}
          dir="rtl"
          bar={false}
          labelId="test-section-label"
          service="persian"
          href="/igbo/other-index"
          linkText="See All"
        >
          بعض محتوى النص
        </SectionLabel>,
      );
    });
  });

  describe('When hideSectionHeader is true', () => {
    shouldMatchSnapshot(
      'should add styling to hide SectionLabel for all breakpoints',
      <SectionLabel
        script={latin}
        bar={false}
        visuallyHidden
        labelId="test-section-label"
        service="news"
      >
        This is the text in a SectionLabel
      </SectionLabel>,
    );
  });

  describe('Assertions', () => {
    it('should add extra props passed to the component', () => {
      const { container } = render(
        <SectionLabel
          script={latin}
          bar={false}
          visuallyHidden
          labelId="test-section-label"
          service="news"
          data-section-divider="section_name"
        >
          This is the text in a SectionLabel
        </SectionLabel>,
      );

      expect(
        container.querySelector('div').getAttribute('data-section-divider'),
      ).toEqual('section_name');
    });
  });

  describe('With heading overriden', () => {
    shouldMatchSnapshot(
      'should render a strong element instead of an h2',
      <SectionLabel
        script={latin}
        bar={false}
        labelId="test-section-label"
        service="news"
        overrideHeadingAs="strong"
      >
        This is text in a SectionLabel.
      </SectionLabel>,
    );

    it('should log a warning when heading override is an unsupported element', () => {
      console.error = jest.fn();

      render(
        <SectionLabel
          script={latin}
          bar={false}
          labelId="test-section-label"
          service="news"
          overrideHeadingAs="h1"
        >
          This is the text in a SectionLabel
        </SectionLabel>,
      );

      const error = console.error.mock.calls.join(' ');

      expect(error).toMatch(
        `Warning: Failed %s type: %s%s,prop,Invalid prop \`overrideHeadingAs\` of value \`h1\` supplied to \`SectionLabel\`, expected one of [null,"strong"].,
    at SectionLabel`,
      );
    });
  });
});
