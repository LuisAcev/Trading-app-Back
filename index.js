import { Server } from "./server/server.js";

const server = new Server();

(async () => {
  try {
    // await server.getExternalMarketData();
    server.listen(); 
  } catch (error) {
    console.error("Error al obtener los datos externos:", error);
    process.exit(1); 
  }
})();
