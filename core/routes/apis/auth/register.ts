import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { response } from "../../../modules/response.module";
import { createUser, fetchUsers } from "../../../postgres/user/dml";
import IUser from "../../../Interfaces/User.interface";
import UserValidator from "../../../validators/User.validator";

export default async (req: Request, res: Response) => {
  try {
    const data: IUser = req.body
    UserValidator.validateSync(data)

    const users = await fetchUsers(`SELECT * FROM users WHERE email= $1`, [data.email])

    if(users.length > 0) {
      return response(res).error(409, {
        data: "Email is already exists"
      })
    }

    const hashedPassword = bcrypt.hashSync(data.password, 12);

    const newUser = await createUser({
        ...data,
        password: hashedPassword
    })

    if(!newUser) {
      return response(res).error(409, {
        data: "Cannot Create User"
      })
    }

    return response(res).success({
        email: newUser.email,
        id: newUser.id,
    })
    
  } catch (err) {
    return response(res).error(500, {
      data: err
    })
  }
};
