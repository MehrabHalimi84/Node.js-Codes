const http = require('http');
const os = require('./commponents/os');
const server = http.createServer((req , res) => {
    if (req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1> hi my friend</h1>');
    }
    else if (req.url === '/os'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>${os()}</h1>`);
    }
})

server.on('connection', (socket) => {
    console.log('New client connected');
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});