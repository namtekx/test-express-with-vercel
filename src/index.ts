import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import http from "http";
import path from "path";
import { AuthController } from "~@/routes/controllers";
import { response } from "~@/modules/response.module";

const app = express();
const server = http.createServer(app);
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
app.use(express.static(path.join(__dirname, "../../../client")));

app.use((err: any, req: Request, res: Response) => {
  return res.status(err.status || 500).json({
    isError: true,
    payload: err.toString(),
  });
});

//api
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
app.get("/test", async (req, res) => {
  const query = req.query
  return response(res).success({
    user: {
      email: "nam@gmail.com",
      id: "123",
      query
    }
  })
})

app.use("/api/auth", AuthController);

//running
(async () => {
  console.log("running");
  server.listen(process.env.PORT, () => {
    console.log(`> web application is runnning on PORT: ${process.env.PORT}`, {
      port: process.env.PORT,
    });
  });
})();
