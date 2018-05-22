import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Headline from './Headline';

configure({ adapter: new Adapter() });

test('renders a heading with the given text', () => {
  const text = 'Hello';
  const component = shallow(<Headline text={text}/>);
  
  expect(component.text()).toEqual(text);
});
