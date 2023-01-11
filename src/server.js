import http from 'http';
import app from './app.js';

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);