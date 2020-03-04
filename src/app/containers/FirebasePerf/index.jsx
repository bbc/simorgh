import React from 'react';
import useToggle from '../Toggle/useToggle';
import beacon from './beacon';

const firebasePerfSdk =
  'https://www.gstatic.com/firebasejs/7.9.3/firebase-performance-standalone.js';
const firebaseConfig = {
  apiKey: 'AIzaSyB2Wlkkt8waCDIV0gLfPkeQEAj9saERAQY',
  authDomain: 'simorgh-rum-demo.firebaseapp.com',
  databaseURL: 'https://simorgh-rum-demo.firebaseio.com',
  projectId: 'simorgh-rum-demo',
  storageBucket: 'simorgh-rum-demo.appspot.com',
  messagingSenderId: '418106297778',
  appId: '1:418106297778:web:2d6625afd3e4e684e128ab',
};

const FirebasePerfBeacon = () => {
  const { enabled } = useToggle('firebasePerf');

  if (enabled) {
    try {
      beacon(firebasePerfSdk, firebaseConfig);
    } catch (err) {
      console.log(`Erro Initialising Firebase Perf SDK: ${err}`);
    }
  }

  return null;
};

export default FirebasePerfBeacon;
