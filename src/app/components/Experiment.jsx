import React from 'react';

class Experiment extends React.Component {
  static experiments = {
    variants: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
  };

  static getRandomVariant() {
    const { variants } = Experiment.experiments;
    const variant = variants[Math.floor(Math.random() * variants.length)];
    return variant;
  }

  static getDerivedStateFromProps(nextProps) {
    const { children } = nextProps;
    const variant = Experiment.getRandomVariant();

    const childVariant = children.filter(child => child.props.name === variant);

    return { childVariant };
  }

  render() {
    return this.state.childVariant;
  }
}

export default Experiment;
