import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ILogin from "../../../Interfaces/Login.interface";
import LoginValidator from "../../../validators/Login.validator";
import { response } from "../../../modules/response.module";
import { generateToken } from "../../../modules/generate.module";
import { fetchUsers } from "../../../postgres/user/dml";

export default async (req: Request, res: Response) => {
  try {
    const data: ILogin = req.body
    LoginValidator.validateSync(data)
    console.log(process.env.SIGN)

    const filter = [data.email]
    const users = await fetchUsers(`SELECT * FROM users WHERE email=$1`, filter)

    if(users.length <= 0) {
      return response(res).error(404, {
        data: "User Not Found"
      })
    }

    const user = users[0]
    const isMatched = bcrypt.compareSync(data.password, user?.password);

    if(!isMatched) {
      return response(res).error(401, {
        data: "User Not Found"
      })
    }

    const token = generateToken({
      "x-user-id": user.id,
      email: user.email,
    });

    return response(res).success({
      token: token,
      email: user.email,
      id: user.id,
    })
    
  } catch (err) {
    return response(res).error(500, {
      data: err
    })
  }
};
