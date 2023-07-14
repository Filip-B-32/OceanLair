const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(3).max(50).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(3).max(50).required(),
  mail: Joi.string().email().required(),
});

router.post(
  "/signup",
  validator.body(signupSchema),
  authControllers.controllers.postSignup
);

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

//test route for middleware
router.get("/test", auth, (req, res)=>{
  res.send("request passed");
})

module.exports = router;
