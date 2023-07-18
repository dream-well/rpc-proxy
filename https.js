const https = require('https');
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();


const express = require('express');

// Creating express server
const app = express();

const port = 8545;
const RPC_URL = 'http://localhost:8544';

let httpsOptions = {
  key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`),
  cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/fullchain.pem`),
};

app.use(morgan("combined"));

app.use(createProxyMiddleware({
    target: RPC_URL,
    changeOrigin: true,
}));


https.createServer(httpsOptions, app).listen(443, (err) => {
  if (err) throw err;
  console.log(`> Server started on https://${process.env.DOMAIN}:${port}`);
});
