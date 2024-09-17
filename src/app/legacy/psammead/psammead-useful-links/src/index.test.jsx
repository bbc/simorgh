import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { UsefulLink, UsefulLinksLi, UsefulLinksUl } from './index';

const usefulCaptions = [
  {
    name: 'Mitocinmu da sauko da sautin labarai',
    url: 'https://www.bbc.com/igbo/afirika-49883577',
  },
  {
    name: 'Labaran BBC Hausa a text',
    url: 'https://www.bbc.com/igbo/afirika-49872694',
  },
  {
    name: 'Abokan huldar BBC Hausa',
    url: 'https://www.bbc.com/igbo/afirika-49869003',
  },
  {
    name: 'Timi Frank: Osinbajo ya maka mutum biyu',
    url: 'https://www.bbc.com/igbo/afirika-49883189',
  },
  {
    name: 'Gwaninta ba ta karbi wani dan Nijeriya',
    url: 'https://www.bbc.com/igbo/afirika-49869001',
  },
];

describe('One useful link', () => {
  it('should render correctly', () => {
    const { container } = render(
      <UsefulLink script={latin} service="news" href={usefulCaptions[0].url}>
        {usefulCaptions[0].name}
      </UsefulLink>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Multiple useful links', () => {
  it('should render correctly', () => {
    const { container } = render(
      <UsefulLinksUl>
        {usefulCaptions.map(item => {
          return (
            <UsefulLinksLi key={usefulCaptions.indexOf(item)}>
              <UsefulLink script={latin} service="news" href={item.url}>
                {item.name}
              </UsefulLink>
            </UsefulLinksLi>
          );
        })}
      </UsefulLinksUl>,
    );
    expect(container).toMatchSnapshot();
  });
});
