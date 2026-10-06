import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import { Headline, SubHeading } from './index';
import { MEDIA_ARTICLE_PAGE } from '../../../../routes/utils/pageTypes';

describe('Headline component', () => {
  it('should render correctly', () => {
    render(<Headline>This is my headline.</Headline>);
    expect(
      screen.getByRole('heading', { name: 'This is my headline.' }),
    ).toBeInTheDocument();
  });

  it('should render correctly on page types that support a dark ui', () => {
    render(<Headline>This is my headline.</Headline>, {
      pageType: MEDIA_ARTICLE_PAGE,
    });
    expect(
      screen.getByRole('heading', { name: 'This is my headline.' }),
    ).toBeInTheDocument();
  });

  it('should render correctly with arabic script typography values', () => {
    render(<Headline>هذا هو العنوان الخاص بي</Headline>, {
      service: 'persian',
    });
    expect(
      screen.getByRole('heading', { name: 'هذا هو العنوان الخاص بي' }),
    ).toBeInTheDocument();
  });
});

describe('SubHeading component', () => {
  it('should render correctly', () => {
    render(<SubHeading tabIndex={-1}>This is a SubHeading</SubHeading>);
    expect(
      screen.getByRole('heading', { name: 'This is a SubHeading' }),
    ).toBeInTheDocument();
  });

  it('should render correctly on page types that support a dark ui', () => {
    render(<SubHeading tabIndex={-1}>This is a SubHeading</SubHeading>, {
      pageType: MEDIA_ARTICLE_PAGE,
    });
    expect(
      screen.getByRole('heading', { name: 'This is a SubHeading' }),
    ).toBeInTheDocument();
  });

  it('should render correctly with arabic script typography values', () => {
    render(<SubHeading tabIndex={-1}>هذا عنوان فرعي</SubHeading>);
    expect(
      screen.getByRole('heading', { name: 'هذا عنوان فرعي' }),
    ).toBeInTheDocument();
  });

  it('should render correctly with an ID', () => {
    render(
      <SubHeading id="This-is-a-SubHeading" tabIndex={-1}>
        This is a SubHeading
      </SubHeading>,
    );
    expect(
      screen.getByRole('heading', { name: 'This is a SubHeading' }),
    ).toHaveAttribute('id', 'This-is-a-SubHeading');
  });
});
