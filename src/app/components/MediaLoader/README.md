## Description

This component loads a media player into our webpage. It uses the BBC Universal Media Player module (BUMP) to choose the correct Embedded Media Player (EMP) for the user's device. Using BUMP removes the concerns involved in serving different devices and web-browsers as BUMP automatically provides the best fitting EMP for the client. For example, BUMP can cater for differences between mobiles, laptops and desktops, but also factors such as whether the user is using network data (3G) or a WIFI.

## Local Development

So that the EMP can load video data, our localhost's domain name should be altered from `localhost:7080` to `localhost.bbc.com:7080` to fully encorporate the bbc domain name (bbc) and top-level domain (.com).

First, run the command (you only need to run this once):

`sudo -- sh -c -e "echo '127.0.0.1       localhost.bbc.com' >> /etc/hosts";`

Then, access local pages using: `localhost.bbc.com:7080/`,
eg.
Express pages: `http://localhost.bbc.com:7080/afaanoromoo/articles/c4g19kgl85ko`

Next pages: `http://localhost.bbc.com:7081/pidgin/live/c7p765ynk9qt?renderer_env=test`

Currently, the EMP is set to only load Live video assets by default. To load test assets, append the query `?renderer_env=test` to the url. Eg. `http://localhost.bbc.com:7080/afaanoromoo/articles/c4g19kgl85ko?renderer_env=test`

## Note on playback in local development

In the Next.js app we have `reactStrictMode: true`. This causes lifecycle hooks to be called twice in development mode. This can result in the media player being loaded twice, causing mulitple playbacks of the same media. This does **not** happen in production mode.
