export default classification =>
  !(
    classification === 'vj-amp-not-supported' ||
    classification === 'idt1-amp' ||
    classification === 'idt1-canonical'
  );
