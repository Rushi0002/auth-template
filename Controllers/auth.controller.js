import createHttpError from "http-errors";
import User from "../Models/User.model.js";
import authSchema from "../Helpers/Validations/auth.validation.js";

export const AuthController = async (req, res, next) => {
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
    res.send(savedUser);
  } catch (error) {
    //Check if error comes from Joi change error status code
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};
