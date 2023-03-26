const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config()

// Creating express server
const app = express();

const PORT = process.env.PORT || 18081;
const TARGET = process.env.TARGET ?? 'http://monero.dyni.net:18081';

console.log(TARGET);

app.use(morgan("combined"));

app.use(createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
}));

app.listen(PORT, () => {
    console.log(`Starting proxy at ${PORT}`)
});