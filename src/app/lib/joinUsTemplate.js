const fontFamily = 'font-family: Helvetica, Arial, sans-serif';
const titleStyle = `${fontFamily}; font-size: 32px; line-height: 1.5; color: #fff`;
const bbcStyle = `${titleStyle}; background-color: #000; padding: 4px 14px`;
const newsStyle = `${titleStyle}; background-color: #bb1919; padding: 4px 220px 4px 0`;
const textStyle = `${fontFamily}; font-size: 14px; line-height: 1.15rem`;
const linkStyle = `${textStyle}; text-decoration: underline`;
const noStyle = '';

export const templateStyles = [
  bbcStyle,
  noStyle,
  bbcStyle,
  noStyle,
  bbcStyle,
  noStyle,
  newsStyle,
  noStyle,
  textStyle,
  linkStyle,
  textStyle,
];

export const template = `
%cB%c %cB%c %cC%c %c NEWS
%c
%cHi there! Do you want to help build a fast and accessible web experience used
by over 500 million people around the world each month? We're hiring people for
all sorts of roles. Head on over to %chttps://bbc.github.io/join-us/%c to find out more!
`;
