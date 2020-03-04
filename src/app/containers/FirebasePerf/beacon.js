const beacon = (firebasePerfSdk, firebaseConfig) => {
  (function(sa, fbc) {
    function load(f, c) {
      var a = document.createElement('script');
      a.async = 1;
      a.src = f;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(a, s);
    }
    load(sa);
    window.addEventListener('load', function() {
      firebase.initializeApp(fbc).performance();
    });
  })(firebasePerfSdk, firebaseConfig);
};

export default beacon;
