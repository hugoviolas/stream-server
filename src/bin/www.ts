import { normalize } from "path";
import app from "../app";
import * as http from "http";

const port = process.env.PORT || 3000;
app.set("port", port);

// Create HTTP server

const server: http.Server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
