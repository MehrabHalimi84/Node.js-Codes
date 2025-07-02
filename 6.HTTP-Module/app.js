const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'سلام دنیا' }));
  } else if (req.url === '/api/courses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'Course 1' }, { id: 2, name: 'Course 2' }]));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: '404 Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});


