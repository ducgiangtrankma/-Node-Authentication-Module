import Joi from "joi";
import { transValidation } from "../lang/vi";
const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message(transValidation.password_incorrect);
  }
  if (
    !value.match(/\d/) ||
    !value.match(/[a-zA-Z]/) ||
    !value.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
  ) {
    return helpers.message(transValidation.password_incorrect);
  }
  return value;
};

const registerValidate = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .pattern(RegExp("gmail.com"))
      .email()
      .lowercase()
      .required()
      .messages({
        "string.pattern.base": transValidation.email_incorrect, // key message get in error.details.type
        "string.email": transValidation.email_incorrect,
        "string.empty": transValidation.email_empty,
        "any.required": transValidation.email_require,
      }),
    password: Joi.string().min(8).max(32).required().custom(password).messages({
      "string.min": transValidation.password_incorrect,
      "string.max": transValidation.password_incorrect,
      "string.empty": transValidation.password_empty,
      "any.required": transValidation.password_require,
    }),
    gender: Joi.string()
      .valid(...["Male", "Female", "Other"])
      .messages({
        "any.only": transValidation.gender_incorrect,
      }),
  });
  const { error } = userSchema.validate(req.body);
  console.log(error);
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    next({
      status: 422,
      message,
    });
  }
  next();
};

export const authValid = {
  registerValidate,
};
