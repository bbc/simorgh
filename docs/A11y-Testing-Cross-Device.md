# Testing on Multiple Devices for an A11y Swarm
When conducting an A11y swarm, we often want to test a branch of Simorgh across multiple devices, e.g. on an A11y laptop with specialist software installed. In this document we specify some instructions to allow you to test cross device with Simorgh; we assume the dev machine is MacOS, any device can be used for a11y testing. The instructions allow you to load a locally running instance of Simorgh on your local wifi network.

1. In Simorgh's route directory navigate to [`webpack.config.client.js`](https://github.com/bbc/simorgh/blob/latest/webpack.config.client.js)
2. Replace `localhost` on [line 33](https://github.com/bbc/simorgh/blob/65743560d6721eef69ae64cc66d6b569cfd2d000/webpack.config.client.js#L33) and [line 40](https://github.com/bbc/simorgh/blob/65743560d6721eef69ae64cc66d6b569cfd2d000/webpack.config.client.js#L40) to `0.0.0.0`
3. Open up a new terminal window and type `ifconfig`
4. CMD + F for `inet` and find your local network IP address, it will likely be in this format `inet 192.168.0.xx` with the `xx` being your devices IP number.
5. In the `local.env` file, change the [these lines](https://github.com/bbc/simorgh/blob/4521b30e356673c68472cef2c67c234955e889b3/envConfig/local.env#L2..L3) to match your dev machine's IP address: `http://192.168.0.xx:7080`
6. Replace [this line](https://github.com/bbc/simorgh/blob/4521b30e356673c68472cef2c67c234955e889b3/src/server/index.jsx#L64) with the following code: `const injectCspHeaderProdBuild = skipMiddleware;` to disable the csp policy for testing; allowing javascript files to be loaded in the browser from your dev machine.
7. Start up your Simorgh with a production build: `npm run build && npm run start` and visit http://192.168.0.xx:7080/mundo/23263889
8. Now you should be able to access any page on any device that's connected on your local network by prefixing your Simorgh's host machines IP http://192.168.0.xx:7080/foobar instead of http://localhost:7080/foobar
