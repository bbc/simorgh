// Quick example I borrowed from https://snappywebdesign.net/blog/how-to-code-a-copy-link-to-clipboard-button/
// PS Web have an example in their design library

const CopyToClipboard = (toCopy: string) => {
  const el = document.createElement(`textarea`);
  el.value = toCopy;
  el.setAttribute(`readonly`, ``);
  el.style.position = `absolute`;
  el.style.left = `-9999px`;
  document.body.appendChild(el);
  el.select();
  document.execCommand(`copy`);
  document.body.removeChild(el);
};

export default CopyToClipboard;
