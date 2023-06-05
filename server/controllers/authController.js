const User = require("../models/user");
const {
  hashPassword,
  comparePassword,
  isEmailValid,
} = require("../helpers/auth.js");
const emailValidator = require("deep-email-validator");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, checked } = req.body;
    //check for the email provided by the user on client and validate it
    //const emailValid = await emailValidator.validate(email);
    //if (emailValid.valid)
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.status(409).json("Email already exist !!!");
    }
    const hashedPw = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPw,
      checked,
    });

    return res.status(200).json("Thank you for your registration");
    // return res.status(400).send({
    //   message: "Please provide a valid email address.",
    //   reason: emailValid.validators.smtp.reason,
    // });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json("User not found");
    }
    const matchPw = await comparePassword(password, user.password);
    if (matchPw) {
      res.status(200).json("Password match");
    }
    //res.status(200).json("Successfully login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
