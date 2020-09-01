const { default: validator } = require("validator");
const isEmpty = require("is-empty");

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 10;

module.exports = function validateLoginInput(data) {
  let errors = {}; // Convert empty fields to an empty string so we can use validator functions

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : ""; // Email checks

  //email validatation
  validator.isEmpty(data.email) ? (errors.email = "Email required.") : {};
  validator.isEmail(data.email) ? {} : (errors.email = "Email not valid.");

  //password validation
  validator.isEmpty(data.password)
    ? (errors.password = "Password required.")
    : {};
  validator.isLength(data.password, {
    min: MIN_PASSWORD_LENGTH,
    max: MAX_PASSWORD_LENGTH,
  })
    ? {}
    : (errors.password = "Password must be 6 letters.");

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
