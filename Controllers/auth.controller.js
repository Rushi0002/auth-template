import createHttpError from "http-errors";
import User from "../Models/User.model.js";
import authSchema from "../Helpers/Validations/auth.validation.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../Helpers/Jwt_helper.js";

export const RegisterController = async (req, res, next) => {
  try {
    //Validate req with Joi schema
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });

    //If email is already registered throw error
    if (doesExist) {
      throw createHttpError.Conflict(
        `${result.email} is already been registered`
      );
    }

    //Save user to db
    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    //Check if error comes from Joi change error status code
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

export const LoginController = async (req, res, next) => {
  try {
    //Validate req with Joi schema
    const result = await authSchema.validateAsync(req.body);

    const user = await User.findOne({ email: result.email });
    if (!user) throw createHttpError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) {
      throw createHttpError.Unauthorized("Email or Password not valid");
    }
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    //Check if error comes from Joi change error status code
    if (error.isJoi === true) {
      return next(createHttpError.BadRequest("Invalid Email and Password"));
    }
    next(error);
  }
};

export const RefreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createHttpError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    res.send({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};
