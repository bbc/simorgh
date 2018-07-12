import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies

// ignore console.error() in testing suite to silence node_dependency console statements
global.console.error = jest.fn();
global.fetch = fetch;
