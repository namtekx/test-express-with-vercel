import express, { Request, Response } from 'express'
import { response } from '../core/modules/response.module'

const app = express()
const port = process.env.PORT || 8080

app.get('/', (_req: Request, res: Response) => {
	return res.send('Express Typescript on Vercel')
})

app.get('/ping', (_req: Request, res: Response) => {
	return res.send('pong 🏓')
})

app.get("/", async (req, res) => {
	const query = req.query
	return response(res).success({
	  user: {
		email: "nam@gmail.com",
		id: "123",
		query
	  }
	})
  })
  
app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})
