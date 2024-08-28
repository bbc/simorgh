import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import Grid from '.';
import { ExampleParagraph, ExampleFigure, ExampleImage } from './testHelpers';

describe('Grid component', () => {
  it('should render Grid with Grid items', () => {
    const { container } = render(
      <Grid
        enableGelGutters
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        startOffset={{
          group0: 1,
          group1: 1,
          group2: 1,
          group3: 1,
          group4: 1,
          group5: 5,
        }}
        margins={{
          group0: true,
          group1: true,
          group2: true,
          group3: true,
        }}
      >
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
        >
          <ExampleParagraph identifier="1" />
        </Grid>
        <Grid
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
        >
          <Grid
            item
            columns={{
              group0: 6,
              group1: 6,
              group2: 6,
              group3: 6,
              group4: 6,
              group5: 12,
            }}
          >
            <ExampleParagraph identifier="Landscape image " />
          </Grid>
          <Grid
            item
            columns={{
              group0: 6,
              group1: 6,
              group2: 6,
              group3: 5,
              group4: 5,
              group5: 10,
            }}
          >
            <ExampleParagraph identifier="Landscape image's caption " />
          </Grid>
        </Grid>
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 5,
            group4: 5,
            group5: 10,
          }}
        >
          <ExampleParagraph identifier="Paragraph " />
        </Grid>
        {['2', '3', '4', '5', '6', '7', '8', '9', '10'].map(num => (
          <Grid
            item
            columns={{
              group0: 6,
              group1: 6,
              group2: 6,
              group3: 5,
              group4: 5,
              group5: 10,
            }}
            key={`${num}item`}
          >
            <ExampleParagraph identifier={num} />
          </Grid>
        ))}
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render Grid with Grid items including nested non-Grid Figure element', () => {
    const { container } = render(
      <Grid
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        enableGelMargins
      >
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 1,
            group5: 5,
          }}
        >
          <ExampleParagraph identifier="1" />
        </Grid>
        <ExampleFigure>
          <Grid
            columns={{
              group0: 6,
              group1: 6,
              group2: 6,
              group3: 6,
              group4: 6,
              group5: 12,
            }}
            startOffset={{
              group0: 1,
              group1: 1,
              group2: 1,
              group3: 1,
              group4: 1,
              group5: 5,
            }}
          >
            <Grid
              item
              columns={{
                group0: 6,
                group1: 6,
                group2: 6,
                group3: 6,
                group4: 6,
                group5: 12,
              }}
              startOffset={{
                group0: 1,
                group1: 1,
                group2: 1,
                group3: 1,
                group4: 1,
                group5: 5,
              }}
            >
              <ExampleParagraph identifier="Landscape image " />
            </Grid>
            <Grid
              item
              columns={{
                group0: 6,
                group1: 6,
                group2: 6,
                group3: 5,
                group4: 5,
                group5: 10,
              }}
              startOffset={{
                group0: 1,
                group1: 1,
                group2: 1,
                group3: 1,
                group4: 1,
                group5: 5,
              }}
            >
              <ExampleParagraph identifier="Landscape image's caption " />
            </Grid>
          </Grid>
        </ExampleFigure>
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 5,
            group4: 5,
            group5: 10,
          }}
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 1,
            group5: 5,
          }}
        >
          <ExampleParagraph identifier="Paragraph " />
        </Grid>
        {['2', '3', '4', '5', '6', '7', '8', '9', '10'].map(num => (
          <Grid
            item
            columns={{
              group0: 6,
              group1: 6,
              group2: 6,
              group3: 5,
              group4: 5,
              group5: 10,
            }}
            startOffset={{
              group0: 1,
              group1: 1,
              group2: 1,
              group3: 1,
              group4: 1,
              group5: 5,
            }}
            key={`${num}item`}
          >
            <ExampleParagraph identifier={num} />
          </Grid>
        ))}
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render Grid with enableGelGutters & margins on only one of the Grid items', () => {
    const { container } = render(
      <Grid
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 8,
        }}
      >
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 6,
          }}
        >
          <ExampleImage />
        </Grid>
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 6,
          }}
          margins={{
            group0: true,
            group1: true,
            group2: true,
            group3: true,
          }}
        >
          <p>
            Image & Paragraph - groups 0-3 span 6/6 columns, groups 4+ span 6/8
            columns. Grid item surrounding Paragraph has margins defined.
          </p>
        </Grid>
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });
});
