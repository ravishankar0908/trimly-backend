import jwt from "jsonwebtoken";
import { messages, statusCodes } from "../util/responseStatuscodes";
export const userAuthourization = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(statusCodes.notFound).json({
      message: messages.invalidToken,
    });

  jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
    if (err)
      return res.status(statusCodes.notFound).json({ message: err.message });
    req.user = user;
    next();
  });
};
