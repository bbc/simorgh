import React from 'react';
import { render, waitFor } from '../react-testing-library-with-providers';
import AmpExperiment from './index';

const experimentConfig = {
  someAmpExperiment: {
    variants: {
      control: 33,
      variant_1: 33,
      variant_2: 33,
    },
  },
};

const multipleExperimentConfig = {
  aExperiment: {
    variants: {
      control: 33,
      variant_1: 33,
      variant_2: 33,
    },
  },
  bExperiment: {
    variants: {
      control: 33,
      variant_1: 33,
      variant_2: 33,
    },
  },
};

const analyticsConfig = {
  requests: {
    base: 'somehost.com',
    clicks: 'somehost.com?somequeryparam=somevalue',
  },
  triggers: {
    trackClicks: {
      on: 'click',
      request: 'clicks',
      selector: 'a',
    },
  },
};

describe('Amp experiment container on Amp pages', () => {
  it('should render an amp-experiment with the expected experiment config', async () => {
    const { container } = render(
      <AmpExperiment experimentConfig={experimentConfig} />,
    );
    expect(container.querySelector('amp-experiment')).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
    <div>
      <amp-experiment>
        <script
          type="application/json"
        >
          {"someAmpExperiment":{"variants":{"control":33,"variant_1":33,"variant_2":33}}}
        </script>
      </amp-experiment>
    </div>
    `);
  });

  it('should render an amp-experiment with the expected config when multiple experiments are running at the same time', async () => {
    const { container } = render(
      <AmpExperiment experimentConfig={multipleExperimentConfig} />,
    );
    expect(container.querySelector('amp-experiment')).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <amp-experiment>
          <script
            type="application/json"
          >
            {"aExperiment":{"variants":{"control":33,"variant_1":33,"variant_2":33}},"bExperiment":{"variants":{"control":33,"variant_1":33,"variant_2":33}}}
          </script>
        </amp-experiment>
      </div>
    `);
  });

  it('should render an amp-analytics with the expected analytics config if present', async () => {
    const { container } = render(
      <AmpExperiment
        experimentConfig={experimentConfig}
        analyticsConfig={analyticsConfig}
      />,
    );
    expect(container.querySelector('amp-experiment')).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
    <div>
      <amp-experiment>
        <script
          type="application/json"
        >
          {"someAmpExperiment":{"variants":{"control":33,"variant_1":33,"variant_2":33}}}
        </script>
      </amp-experiment>
      <amp-analytics
        type="piano"
      >
        <script
          type="application/json"
        >
          {"requests":{"base":"somehost.com","clicks":"somehost.com?somequeryparam=somevalue"},"triggers":{"trackClicks":{"on":"click","request":"clicks","selector":"a"}}}
        </script>
      </amp-analytics>
    </div>
    `);
  });

  it(`should add amp-experiment extension script to page head`, async () => {
    render(<AmpExperiment experimentConfig={experimentConfig} />);

    await waitFor(() => {
      const scripts = Array.from(document.querySelectorAll('head script'));

      expect(scripts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            src: `https://cdn.ampproject.org/v0/amp-experiment-0.1.js`,
          }),
        ]),
      );

      expect(scripts).toHaveLength(1);
    });
  });
});
