import jwt from "jsonwebtoken";

export const generateJWT =(data) => {
  return new Promise((resolver, reject) => {
    jwt.sign(
        data,
        process.env.SECRET_JWS_KEY, 
        (err, token) => {
      if (err) {
        reject("Token cannot be generated");
      } else {
        resolver(token);
      }
    });
  });
};
