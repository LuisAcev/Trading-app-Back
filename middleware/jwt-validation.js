import { request, response } from "express";
import jwt from "jsonwebtoken";

export const jwtValidationAssets = (req = request, res = response, next) => {
  const tokenAuth = req.header( 'authorization');

  if (!tokenAuth) {
    return res.status(401).json({
      msg: "Token does not exist / Token not provided",
    });
  }

  try {

   jwt.verify(tokenAuth, process.env.SECRET_JWS_KEY);

    next(); // Llama al siguiente middleware o controlador
  } catch (error) {
    // Manejo de errores
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        msg: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        msg: "Token invalid: " + error.message,
      });
    }

    if (error.name === "NotBeforeError") {
      return res.status(401).json({
        msg: "Token not active yet",
      });
    }

    // Si es otro tipo de error
    return res.status(500).json({
      msg: "Token validation error: " + error.message,
    });
  }
};
