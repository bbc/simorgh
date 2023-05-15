import React from 'react';
import { render } from '../../../react-testing-library-with-providers';
import MostReadList from '.';
import { getItemWrapperArray } from '../../utilities/testHelpers';

describe('MostReadList', () => {
  it('should render with ltr news items with correct dir', () => {
    const { container } = render(
      <MostReadList numberOfItems={10} dir="ltr">
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'news',
          dir: 'ltr',
          size: 'default',
        })}
      </MostReadList>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with rtl arabic items with correct dir', () => {
    const { container } = render(
      <MostReadList numberOfItems={10} dir="rtl">
        {getItemWrapperArray({
          numberOfItems: 10,
          service: 'persian',
          dir: 'rtl',
          size: 'default',
        })}
      </MostReadList>,
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
        })}
      </MostReadList>,
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
        })}
      </MostReadList>,
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
        })}
      </MostReadList>,
    );
    expect(container).toMatchSnapshot();
  });
});
