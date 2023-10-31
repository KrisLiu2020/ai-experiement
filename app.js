import http from 'http';
import { pipeline } from "@xenova/transformers";
const pipe = await pipeline('sentiment-analysis');

console.log(await pipe('hungry'));

const server = http.createServer(async (req, res) => {
<<<<<<< HEAD
  // Handle preflight requests for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Replace with your allowed origin(s)
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/') {
    console.log("received POST request");
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', async () => {
      try {
        const text= JSON.parse(data);
        const pipe = await pipeline('sentiment-analysis');
        const result = await pipe(text.statement);


        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"});
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
=======
    if (req.method === 'POST' && req.url === '/') {
      console.log('POST request received.')
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });

      console.log(`data: ${data}`);
  
      req.on('end', async () => {
        try {
          const { text } = JSON.parse(data);
          const pipe = await pipeline('sentiment-analysis');
          const result = await pipe(text);
  
          res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"});
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
>>>>>>> 5f6695c048f5073932552426578ff22247513612
