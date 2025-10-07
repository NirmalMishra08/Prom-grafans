import { middleware } from "./middleware";
import client from "prom-client";

const express = require('express');
import { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(middleware)

app.get('/', (req: Request, res: Response) => {
  // return HTTP 200 with JSON body
  res.status(200).json({ message: "Hello World!", status: { code: 200 } })
})

interface MetricsRequest extends Request { }
interface MetricsResponse extends Response { }

app.get("/metrics", async (req: MetricsRequest, res: MetricsResponse) => {
  const metrics = await client.register.metrics();
  console.log(client.register.contentType)
  res.set('Content-Type', client.register.contentType);
  res.end(metrics);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})