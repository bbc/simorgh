/* eslint-disable no-console */
import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import SectionLabel from './index';

describe('SectionLabel', () => {
  describe('With bar', () => {
    describe('With plain title', () => {
      it('should render correctly', () => {
        const { container } = render(
          'should render correctly',
          <SectionLabel labelId="test-section-label">
            This is text in a SectionLabel.
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with explicitly showing the bar', () => {
        const { container } = render(
          <SectionLabel labelId="test-section-label" bar>
            This is text in a SectionLabel, and there is a bar over to the right
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with mobileDivider set to false', () => {
        const { container } = render(
          <SectionLabel labelId="test-section-label" mobileDivider={false}>
            This is text in a SectionLabel, and there is no mobile divider
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with explicit text direction', () => {
        const { container } = render(
          <SectionLabel dir="ltr" labelId="test-section-label">
            This is text in a SectionLabel rendering in ltr mode.
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with arabic script typography values', () => {
        const { container } = render(
          <SectionLabel
            dir="rtl"
            labelId="test-section-label"
            service="persian"
          >
            بعض محتوى النص
          </SectionLabel>,
          { service: 'persian' },
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('With linking title', () => {
      it('should render correctly', () => {
        const { container } = render(
          <SectionLabel
            labelId="test-section-label"
            href="/igbo/other-index"
            linkText="See All"
          >
            This is text in a linking SectionLabel.
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with explicitly showing the bar', () => {
        const { container } = render(
          <SectionLabel
            labelId="test-section-label"
            bar
            href="/igbo/other-index"
            linkText="See All"
          >
            This is text in a SectionLabel, and there is a bar over to the right
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with explicit text direction', () => {
        const { container } = render(
          <SectionLabel
            dir="ltr"
            labelId="test-section-label"
            href="/igbo/other-index"
            linkText="See All"
          >
            This is text in a SectionLabel rendering in ltr mode.
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with arabic script typography values', () => {
        const { container } = render(
          <SectionLabel
            dir="rtl"
            labelId="test-section-label"
            service="persian"
            href="/igbo/other-index"
            linkText="See All"
          >
            بعض محتوى النص
          </SectionLabel>,
          { service: 'persian' },
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('Without bar', () => {
      describe('With plain title', () => {
        it('should render correctly', () => {
          const { container } = render(
            <SectionLabel bar={false} labelId="test-section-label">
              This is text in a SectionLabel.
            </SectionLabel>,
          );
          expect(container).toMatchSnapshot();
        });

        it('should render correctly with explicit text direction', () => {
          const { container } = render(
            <SectionLabel dir="ltr" bar={false} labelId="test-section-label">
              This is text in a SectionLabel rendering in ltr mode.
            </SectionLabel>,
          );
          expect(container).toMatchSnapshot();
        });

        it('should render correctly with arabic script typography values', () => {
          const { container } = render(
            <SectionLabel
              dir="rtl"
              bar={false}
              labelId="test-section-label"
              service="persian"
            >
              بعض محتوى النص
            </SectionLabel>,
            { service: 'persian' },
          );
          expect(container).toMatchSnapshot();
        });
      });

      describe('With linking title', () => {
        it('should render correctly', () => {
          const { container } = render(
            <SectionLabel
              bar={false}
              labelId="test-section-label"
              href="/igbo/other-index"
              linkText="See All"
            >
              This is text in a SectionLabel.
            </SectionLabel>,
          );
          expect(container).toMatchSnapshot();
        });

        it('should render correctly with explicit text direction', () => {
          const { container } = render(
            <SectionLabel
              dir="ltr"
              bar={false}
              labelId="test-section-label"
              href="/igbo/other-index"
              linkText="See All"
            >
              This is text in a SectionLabel rendering in ltr mode.
            </SectionLabel>,
          );
          expect(container).toMatchSnapshot();
        });

        it('should render correctly with arabic script typography values', () => {
          const { container } = render(
            <SectionLabel
              dir="rtl"
              bar={false}
              labelId="test-section-label"
              service="persian"
              href="/igbo/other-index"
              linkText="See All"
            >
              بعض محتوى النص
            </SectionLabel>,
            { service: 'persian' },
          );
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('When hideSectionHeader is true', () => {
      it('should add styling to hide SectionLabel for all breakpoints', () => {
        const { container } = render(
          <SectionLabel bar={false} visuallyHidden labelId="test-section-label">
            This is the text in a SectionLabel
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('Assertions', () => {
      it('should add extra props passed to the component', () => {
        const { container } = render(
          <SectionLabel
            bar={false}
            visuallyHidden
            labelId="test-section-label"
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
      it('should render a span element instead of an h2', () => {
        const { container } = render(
          <SectionLabel
            bar={false}
            labelId="test-section-label"
            overrideHeadingAs="strong"
          >
            This is text in a SectionLabel.
          </SectionLabel>,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
