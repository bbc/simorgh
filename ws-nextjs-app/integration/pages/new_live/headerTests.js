// import { runHeaderTests } from '../../../../src/integration/common';

export default () => {
  //runHeaderTests();
  it('I can see the branding', () => {
    console.log(document);
    const logo = document.querySelector('header svg');

    expect(logo).toBeInTheDocument();
    expect(logo.parentNode.textContent).toBeTruthy();
    expect(logo.parentNode.textContent).toMatchSnapshot();
  });
};
