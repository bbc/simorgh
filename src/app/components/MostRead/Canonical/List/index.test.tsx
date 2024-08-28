import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import MostReadList from '.';
import { getItemWrapperArray } from '../../utilities/testHelpers';

describe('MostReadList', () => {
  it('should render with ltr news items with correct dir', () => {
    const { container } = render(
      <MostReadList numberOfItems={10}>
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'news',
          size: 'default',
        })}
      </MostReadList>,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with rtl persian items with correct dir', () => {
    const { container } = render(
      <MostReadList numberOfItems={10} dir="rtl">
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'persian',
          dir: 'rtl',
          size: 'default',
        })}
      </MostReadList>,
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with ltr bengali items with correct dir', () => {
    const { container } = render(
      <MostReadList numberOfItems={10}>
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'bengali',
          dir: 'ltr',
          size: 'default',
        })}
      </MostReadList>,
      { service: 'bengali' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with ltr burmese items with correct dir', () => {
    const { container } = render(
      <MostReadList numberOfItems={10}>
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'burmese',
          dir: 'ltr',
          size: 'default',
        })}
      </MostReadList>,
      { service: 'burmese' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with ltr news items with a max of one column', () => {
    const { container } = render(
      <MostReadList numberOfItems={10} columnLayout="oneColumn">
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'news',
          dir: 'ltr',
          size: 'default',
          columnLayout: 'oneColumn',
        })}
      </MostReadList>,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with ltr news items with a max of two columns', () => {
    const { container } = render(
      <MostReadList numberOfItems={10} columnLayout="twoColumn">
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'news',
          dir: 'ltr',
          size: 'default',
          columnLayout: 'twoColumn',
        })}
      </MostReadList>,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with ltr news items with a multi column layout', () => {
    const { container } = render(
      <MostReadList numberOfItems={10} columnLayout="multiColumn">
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'news',
          dir: 'ltr',
          size: 'default',
          columnLayout: 'multiColumn',
        })}
      </MostReadList>,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });
  it('should render burmese most read with a one column layout', () => {
    const { container } = render(
      <MostReadList numberOfItems={5}>
        {getItemWrapperArray({
          numberOfItems: 5,
          service: 'burmese',
          dir: 'ltr',
          size: 'default',
        })}
      </MostReadList>,
      { service: 'burmese' },
    );
    expect(container).toMatchSnapshot();
  });
});
