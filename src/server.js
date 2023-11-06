import app from './app.js';
import { init } from './socket.js';
import { initdb } from './db/mongodb.js'

await initdb();

const PORT = 8080;

const httpServer = app.listen(PORT, ()=>{console.log(`Server running on http://localhost:${PORT}`)});

init (httpServer)