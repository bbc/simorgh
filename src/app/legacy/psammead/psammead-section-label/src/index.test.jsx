/* eslint-disable no-console */
import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import SectionLabel from './index';

describe('SectionLabel', () => {
  describe('With bar', () => {
    describe('With plain title', () => {
      it('should render correctly', () => {
        render(
          <SectionLabel labelId="test-section-label">
            This is text in a SectionLabel.
          </SectionLabel>,
        );
        expect(
          screen.getByText('This is text in a SectionLabel.'),
        ).toBeInTheDocument();
      });

      it('should render correctly with explicitly showing the bar', () => {
        render(
          <SectionLabel labelId="test-section-label" bar>
            This is text in a SectionLabel, and there is a bar over to the right
          </SectionLabel>,
        );
        expect(
          screen.getByText(
            'This is text in a SectionLabel, and there is a bar over to the right',
          ),
        ).toBeInTheDocument();
      });

      it('should render correctly with mobileDivider set to false', () => {
        render(
          <SectionLabel labelId="test-section-label" mobileDivider={false}>
            This is text in a SectionLabel, and there is no mobile divider
          </SectionLabel>,
        );
        expect(
          screen.getByText(
            'This is text in a SectionLabel, and there is no mobile divider',
          ),
        ).toBeInTheDocument();
      });

      it('should render correctly with explicit text direction', () => {
        render(
          <SectionLabel dir="ltr" labelId="test-section-label">
            This is text in a SectionLabel rendering in ltr mode.
          </SectionLabel>,
        );
        expect(
          screen.getByText(
            'This is text in a SectionLabel rendering in ltr mode.',
          ),
        ).toBeInTheDocument();
      });

      it('should render correctly with arabic script typography values', () => {
        render(
          <SectionLabel dir="rtl" labelId="test-section-label">
            بعض محتوى النص
          </SectionLabel>,
          { service: 'persian' },
        );
        expect(screen.getByText('بعض محتوى النص')).toBeInTheDocument();
      });
    });

    describe('With linking title', () => {
      it('should render correctly', () => {
        render(
          <SectionLabel
            labelId="test-section-label"
            href="/igbo/other-index"
            linkText="See All"
          >
            This is text in a linking SectionLabel.
          </SectionLabel>,
        );
        expect(
          screen.getByText('This is text in a linking SectionLabel.'),
        ).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute(
          'href',
          '/igbo/other-index',
        );
      });

      it('should render correctly with explicitly showing the bar', () => {
        render(
          <SectionLabel
            labelId="test-section-label"
            bar
            href="/igbo/other-index"
            linkText="See All"
          >
            This is text in a SectionLabel, and there is a bar over to the right
          </SectionLabel>,
        );
        expect(
          screen.getByText(
            'This is text in a SectionLabel, and there is a bar over to the right',
          ),
        ).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
      });

      it('should render correctly with explicit text direction', () => {
        render(
          <SectionLabel
            dir="ltr"
            labelId="test-section-label"
            href="/igbo/other-index"
            linkText="See All"
          >
            This is text in a SectionLabel rendering in ltr mode.
          </SectionLabel>,
        );
        expect(
          screen.getByText(
            'This is text in a SectionLabel rendering in ltr mode.',
          ),
        ).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
      });

      it('should render correctly with arabic script typography values', () => {
        render(
          <SectionLabel
            dir="rtl"
            labelId="test-section-label"
            href="/igbo/other-index"
            linkText="See All"
          >
            بعض محتوى النص
          </SectionLabel>,
          { service: 'persian' },
        );
        expect(screen.getByText('بعض محتوى النص')).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
      });
    });

    describe('Without bar', () => {
      describe('With plain title', () => {
        it('should render correctly', () => {
          render(
            <SectionLabel bar={false} labelId="test-section-label">
              This is text in a SectionLabel.
            </SectionLabel>,
          );
          expect(
            screen.getByText('This is text in a SectionLabel.'),
          ).toBeInTheDocument();
        });

        it('should render correctly with explicit text direction', () => {
          render(
            <SectionLabel dir="ltr" bar={false} labelId="test-section-label">
              This is text in a SectionLabel rendering in ltr mode.
            </SectionLabel>,
          );
          expect(
            screen.getByText(
              'This is text in a SectionLabel rendering in ltr mode.',
            ),
          ).toBeInTheDocument();
        });

        it('should render correctly with arabic script typography values', () => {
          render(
            <SectionLabel dir="rtl" bar={false} labelId="test-section-label">
              بعض محتوى النص
            </SectionLabel>,
            { service: 'persian' },
          );
          expect(screen.getByText('بعض محتوى النص')).toBeInTheDocument();
        });
      });

      describe('With linking title', () => {
        it('should render correctly', () => {
          render(
            <SectionLabel
              bar={false}
              labelId="test-section-label"
              href="/igbo/other-index"
              linkText="See All"
            >
              This is text in a SectionLabel.
            </SectionLabel>,
          );
          expect(
            screen.getByText('This is text in a SectionLabel.'),
          ).toBeInTheDocument();
          expect(screen.getByRole('link')).toBeInTheDocument();
        });

        it('should render correctly with explicit text direction', () => {
          render(
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
          expect(
            screen.getByText(
              'This is text in a SectionLabel rendering in ltr mode.',
            ),
          ).toBeInTheDocument();
          expect(screen.getByRole('link')).toBeInTheDocument();
        });

        it('should render correctly with arabic script typography values', () => {
          render(
            <SectionLabel
              dir="rtl"
              bar={false}
              labelId="test-section-label"
              href="/igbo/other-index"
              linkText="See All"
            >
              بعض محتوى النص
            </SectionLabel>,
            { service: 'persian' },
          );
          expect(screen.getByText('بعض محتوى النص')).toBeInTheDocument();
          expect(screen.getByRole('link')).toBeInTheDocument();
        });
      });
    });

    describe('When hideSectionHeader is true', () => {
      it('should add styling to hide SectionLabel for all breakpoints', () => {
        render(
          <SectionLabel bar={false} visuallyHidden labelId="test-section-label">
            This is the text in a SectionLabel
          </SectionLabel>,
        );
        expect(
          screen.getByText('This is the text in a SectionLabel'),
        ).toBeInTheDocument();
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
        render(
          <SectionLabel
            bar={false}
            labelId="test-section-label"
            overrideHeadingAs="strong"
          >
            This is text in a SectionLabel.
          </SectionLabel>,
        );
        expect(
          screen.getByText('This is text in a SectionLabel.').closest('strong'),
        ).toBeInTheDocument();
      });
    });
  });
});
