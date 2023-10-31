// import { pipeline } from "@xenova/transformers";
// const http = require('http');
// // const { pipeline } = require('@xenova/transformers');
// const pipe = await pipeline('sentiment-analysis');

const { pipeline } = require("@xenova/transformers");
const http = require('http');

// console.log(await pipe('hungry'));

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
  
      req.on('end', async () => {
        try {
          const { text } = JSON.parse(data);
          const pipe = await pipeline('sentiment-analysis');
          const result = await pipe(text);
  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          console.error(error);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
  
  const PORT = 8000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });