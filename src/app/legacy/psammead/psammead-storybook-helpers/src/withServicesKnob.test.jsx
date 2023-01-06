import { render, waitFor } from '@testing-library/react';
import * as knobs from '@storybook/addon-knobs';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import chinese from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import withServicesKnob from './withServicesKnob';
import TEXT_VARIANTS from './text-variants';

it('should correctly configure the default story book dropdown', () => {
  const storyFn = () => {};
  knobs.select = jest.fn(() => 'news');

  withServicesKnob()(storyFn);

  expect(knobs.select).toHaveBeenCalledWith(
    'Select a service',
    Object.keys(TEXT_VARIANTS),
    'news',
  );
});

it('should correctly configure the custom story book dropdown', () => {
  const storyFn = () => {};
  knobs.select = jest.fn(() => 'arabic');

  withServicesKnob({
    defaultService: 'arabic',
    services: ['news', 'arabic', 'amharic'],
  })(storyFn);

  expect(knobs.select).toHaveBeenCalledWith(
    'Select a service',
    ['news', 'arabic', 'amharic'],
    'arabic',
  );
});

it('should correctly set the default html dir attribute', async () => {
  const storyFn = () => {};
  knobs.select = () => 'news';
  render(withServicesKnob()(storyFn));
  await waitFor(() => {
    const htmlDirAttr = document.querySelector('html').getAttribute('dir');

    expect(htmlDirAttr).toEqual('ltr');
  });
});

it('should correctly set the chosen service html dir attribute', async () => {
  const mockStoryFn = jest.fn();
  knobs.select = () => 'arabic';
  render(withServicesKnob({ service: 'arabic' })(mockStoryFn));
  await waitFor(() => {
    const htmlDirAttr = document.querySelector('html').getAttribute('dir');

    expect(htmlDirAttr).toEqual('rtl');
  });
});

it('should pass the correct props to the story function', () => {
  const mockStoryFn = jest.fn();
  knobs.select = () => 'news';

  withServicesKnob()(mockStoryFn);

  const expected = {
    script: latin,
    service: 'news',
    articlePath: '/news/articles/cn7k01xp8kxo',
    brandBackgroundColour: '#B80000',
    brandBorderColour: '#EAB3B3',
    brandForegroundColour: '#FDFDFD',
    brandHighlightColour: '#FFFFFF',
    text: 'Could a computer ever create better art than a human?',
    longText:
      'The critic, author, poet and TV host was known for his witty commentary on international television.',
    dir: 'ltr',
    locale: 'en',
    variant: 'default',
    timezone: 'Europe/London',
    selectedService: 'news',
  };

  expect(mockStoryFn).toHaveBeenCalledWith(expected);
});

it('should pass the correct chosen service props to the story function', () => {
  const mockStoryFn = jest.fn();
  knobs.select = () => 'arabic';

  withServicesKnob()(mockStoryFn);

  const expected = {
    script: arabic,
    service: 'arabic',
    articlePath: '/arabic/articles/c1er5mjnznzo',
    brandBackgroundColour: '#B80000',
    brandBorderColour: '#EAB3B3',
    brandForegroundColour: '#FDFDFD',
    brandHighlightColour: '#FFFFFF',
    text: 'لماذا يخجل البعض من اسم قريته في مصر؟',
    longText:
      'هناك وقائع عدة تتسم بالسخرية والجدل والتنمر، ضد أهل القرية الذين أصابهم الغضب والسخط مما دفعهم إلى تقديم طلب لتغيير اسم قريتهم.',
    dir: 'rtl',
    locale: 'ar',
    variant: 'default',
    timezone: 'GMT',
    selectedService: 'arabic',
  };

  expect(mockStoryFn).toHaveBeenCalledWith(expected);
});

it('should pass the correct chosen service props to the story function', () => {
  const mockStoryFn = jest.fn();
  knobs.select = () => 'ukchinaSimp';

  withServicesKnob()(mockStoryFn);

  const expected = {
    script: chinese,
    service: 'ukchina',
    articlePath: '/ukchina/articles/c0e8weny66ko/simp',
    brandBackgroundColour: '#B80000',
    brandBorderColour: '#EAB3B3',
    brandForegroundColour: '#FDFDFD',
    brandHighlightColour: '#FFFFFF',
    text: '该计划的批评者说，这个政策不能解决住房短缺的问题',
    longText:
      '但在当今世界，尽管许多人已不再把步行作为一种主要的出行方式，但巴黎仍然是属于孤僻、哲学式观察者的理想城市。毕竟，法国人习惯于花时间以文学和哲学的方式观察和思考周围的环境',
    dir: 'ltr',
    locale: 'zh-cn',
    variant: 'simp',
    timezone: 'GMT',
    selectedService: 'ukchinaSimp',
  };

  expect(mockStoryFn).toHaveBeenCalledWith(expected);
});
