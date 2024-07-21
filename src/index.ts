import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import http from "http";
import path from "path";
import { response } from "../core/modules/response.module";
const app = express()
const port = process.env.PORT || 8080
const server = http.createServer(app);

app.use(
	//@TODO: add to env
	cors({
		origin: "*",
	})
);

app.use(
	bodyParser.json({
		limit: "500mb",
	})
);

app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "500mb",
		parameterLimit: 10000000,
	})
);

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb" }));

app.get('/', (_req: Request, res: Response) => {
	return res.send('Express Typescript on Vercel')
})

app.get("/test", async (req, res) => {
	const query = req.query
	return response(res).success({
	  user: {
		email: "nam@gmail.com",
		id: "123",
		query
	  }
	})
  });

app.get('/ping', (_req: Request, res: Response) => {
	return res.send('pong 🏓')
});

(async () => {
	console.log("running");
	server.listen(port, () => {
		console.log(`> web application is runnning on PORT: ${port}`, {
			port: port,
		});
	});
})();

