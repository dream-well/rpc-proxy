const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
var AccessControl = require('express-ip-access-control');

require('dotenv').config()

// Creating express server
const app = express();

const PORT = 8545;
const RPC_URL = 'http://localhost:8546';
const ALLOW = '185.246.188.105';

app.use(AccessControl({
    mode: 'allow',
	denys: [],
	allows: [ALLOW],
	forceConnectionAddress: false,
	log: function(clientIp, access) {
		console.log(clientIp + (access ? ' accessed.' : ' denied.'));
	},

	statusCode: 401,
	redirectTo: '',
	message: 'Unauthorized'
}))

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