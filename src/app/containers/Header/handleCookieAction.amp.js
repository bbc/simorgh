const accept = document.querySelector('button[data-cookie-banner="accept"]');
const reject = document.querySelector('button[data-cookie-banner="reject"]');
accept.addEventListener('click', () => {
  document.querySelector('#brandLink a').focus();
});
