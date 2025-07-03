const noscriptTag = window.document.getElementsByTagName('noscript')[0];

const trackingDiv = document.createElement('DIV');
trackingDiv.innerHTML = noscriptTag.innerHTML;
window.document.body.appendChild(trackingDiv);
