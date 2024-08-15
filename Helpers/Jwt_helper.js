import JWT from "jsonwebtoken";
import createHttpError from "http-errors";

export const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "1h",
      issuer: "rushikesh",
      audience: userId.toString(),
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError());
      resolve(token);
    });
  });
};

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createHttpError.Unauthorized(message));
    }

    req.payload = payload;
    next();
  });
};

export const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "rushikesh",
      audience: userId.toString(),
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError());
      resolve(token);
    });
  });
};

export const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) return reject(createHttpError.Unauthorized());
        const userId = payload.aud;
        resolve(userId);
      }
    );
  });
};
