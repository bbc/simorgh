import React from 'react';

class Experiment extends React.Component {
  static experiments = {
    variants: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
  };

  static getDerivedStateFromProps(nextProps) {
    const { children, variant } = nextProps;

    const childVariant = children.filter(child => child.props.name === variant);

    return { childVariant };
  }

  static getRandomVariant() {
    const { variants } = this.experiments;
    const variant = variants[Math.floor(Math.random() * variants.length)];
    return variant;
  }

  render() {
    return this.state.childVariant;
  }
}

export default Experiment;
