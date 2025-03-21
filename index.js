import { Server } from "./server/server.js";

const server = new Server();

server.getExternalMarketData();
server.listen(); // Inicia el servidor
