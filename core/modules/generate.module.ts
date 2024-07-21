import jwt from "jsonwebtoken";
export const generateToken = (payload: Object) => {
  const { key } = JSON.parse(`{ "type": "HS256", "key": "${process.env.SIGN}"}`);
  return jwt.sign(payload, key, {
    algorithm: "HS256",
    subject: "user_authentication",
    expiresIn: "30d",
  });
};

export  const generateCodeReset = (payload: Object) => {
  const { key } = JSON.parse(`{ "type": "HS256", "key": "${process.env.SIGN}"}`);
  return jwt.sign(payload, key, {
    algorithm: "HS256",
    subject: "user_reset_pass",
    expiresIn: "1d",
  });
}