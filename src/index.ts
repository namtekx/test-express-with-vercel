import express, { Request, Response } from 'express'
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { AuthController } from '../core/routes/controllers'
import { pool } from '../core/postgres';

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV !== "production") {
	dotenv.config();
}

const app = express()
const port = process.env.PORT || 8080
//setup
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

app.use("/api/auth", AuthController);

app.listen(port, async () => {
	await pool.connect()
	.then((data) => {
		return console.log(`Server is listening on ${port}`)
	})
	.catch(err => {
		return console.error(err)
	}) 
	
})
