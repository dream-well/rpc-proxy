const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

// Creating express server
const app = express();

const PORT = 8545;
const RPC_URL = 'http://localhost:8546';

app.use(morgan("combined"));

app.use(createProxyMiddleware({
    target: RPC_URL,
    changeOrigin: true,
    // pathRewrite: {
    //     [`^/weather`]: '',
    // },
}));

app.listen(PORT, () => {
    console.log(`Starting proxy at ${PORT}`)
});