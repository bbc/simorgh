import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import arabic from '#components/ThemeProvider/fontScripts/arabic';
import { MEDIA_ARTICLE_PAGE } from '#routes/utils/pageTypes';
import { Headline, SubHeading } from './index';

describe('Headline component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Headline script={latin} service="news">
        This is my headline.
      </Headline>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly on page types that support a dark ui', () => {
    const { container } = render(
      <Headline script={latin} service="news">
        This is my headline.
      </Headline>,
      {
        pageType: MEDIA_ARTICLE_PAGE,
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with arabic script typography values', () => {
    const { container } = render(
      <Headline script={arabic} service="persian">
        هذا هو العنوان الخاص بي
      </Headline>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('SubHeading component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <SubHeading script={latin} service="news">
        This is a SubHeading
      </SubHeading>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly on page types that support a dark ui', () => {
    const { container } = render(
      <SubHeading script={latin} service="news">
        This is a SubHeading
      </SubHeading>,
      {
        pageType: MEDIA_ARTICLE_PAGE,
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with arabic script typography values', () => {
    const { container } = render(
      <SubHeading script={arabic} service="news">
        هذا عنوان فرعي
      </SubHeading>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with an ID', () => {
    const { container } = render(
      <SubHeading id="This-is-a-SubHeading" script={latin} service="news">
        This is a SubHeading
      </SubHeading>,
    );
    expect(container).toMatchSnapshot();
  });
});
