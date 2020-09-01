const { default: validator } = require("validator");
const isEmpty = require("is-empty");

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 10;

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //convert missing data to empty so we can use validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.sex = !isEmpty(data.sex) ? data.sex : "";
  data.tagline = !isEmpty(data.tagline) ? data.tagline : "";

  //name validation
  validator.isEmpty(data.name) ? (errors.name = "Name field required.") : {};

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

  //password confirmation validation
  validator.equals(data.password, data.password2)
    ? {}
    : (errors.password2 = "Passwords must match.");

  //age validation
  data.age >= 0 && data.age <= 100 ? {} : (errors.age = "Age must be between 0 and 100.");

  //sex validation
  validator.isEmpty(data.sex) ? (errors.sex = "Sex is required.") : {};

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

