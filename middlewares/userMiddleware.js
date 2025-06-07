import jwt from "jsonwebtoken";
import { messages, statusCodes } from "../util/responseStatuscodes.js";
export const userAuthourization = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const { userId } = req.query;
  if (token == null)
    return res.status(statusCodes.notFound).json({
      message: messages.invalidToken,
    });

  jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
    if (err)
      return res.status(statusCodes.notFound).json({ message: err.message });

    if (user.role === "shopowner" && user.id !== userId) {
      return res.status(statusCodes.unauth).json({
        message: messages.unauthorized,
      });
    }
    req.user = user;
    next();
  });
};
