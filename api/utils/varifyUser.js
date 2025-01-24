import jwt from "jsonwebtoken";
import { throwError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const tooken = req.cookies.access_token;
  if (!tooken) return next(throwError(401, "Session End. Login Again! "));
  jwt.verify(tooken, "9f8c2b1d5e69fc5e6aa24b8efc2d5a4b349e5d7d1a7e5f42c8c3e9a5f1c4b2d8", (err, user) => {
    if (err) return next(throwError(403, "Frbidden"));
    req.user = user;
    next();
  });
};
