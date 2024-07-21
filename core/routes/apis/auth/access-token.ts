import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { response } from "~@/modules/response.module";
import IAccessToken from "~@/Interfaces/AccessToken.interface";
import AccessTokenValidator from "~@/validators/AccessToken.validator";
import { fetchUsers } from "~@/postgres/user/dml";

export default async (req: Request, res: Response) => {
  try {
    const data: IAccessToken = req.body
    AccessTokenValidator.validateSync(data)
    const decoded = jwt.verify(data.accessToken, process.env.APP_AUTH_KEY || "davinci-2024");
    const email = (<any>decoded).email;

    const users = await fetchUsers(`SELECT * FROM users WHERE email='${email}`)

    if(users.length <= 0) {
      return response(res).error(404, {
        data: "User Not Found"
      })
    }

    const user = users[0]
    return response(res).success({
      user: {
        email: user.email,
        id: user.id,
      }
    })
  } catch (err) {
    return response(res).error(500, {
      data: err
    })
  }
};

