"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const prom_client_1 = __importDefault(require("prom-client"));
const express = require('express');
const app = express();
const port = 3000;
app.use(middleware_1.middleware);
app.get('/', (req, res) => {
    // return HTTP 200 with JSON body
    res.status(200).json({ message: "Hello World!", status: { code: 200 } });
});
app.get("/metrics", async (req, res) => {
    const metrics = await prom_client_1.default.register.metrics();
    console.log(prom_client_1.default.register.contentType);
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(metrics);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
