import http from "http";
import app from "./server/server";

const server = http.createServer(app);
const port = process.env.PORT || 3000;
let currentApp = app;

/* eslint-disable no-console */

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log(`Started and listening on http://localhost:${port}`);
});

if (module.hot) {
  console.log('✅  Server-side Hot Module Replacement enabled');

  module.hot.accept("./server/server", () => {
    console.log("🔁  Hot Module Replacement reloading `./server/server`...");
    server.removeListener("request", currentApp);
    const newApp = require("./server/server").default; // eslint-disable-line global-require
    server.on("request", newApp);
    currentApp = newApp;
  });
}
