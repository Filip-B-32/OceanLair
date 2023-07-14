const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postSignup = async (req, res) => {
  try {
    const { name, mail, password } = req.body;

    // check if user exists
    const userExists = await User.exists({ mail: mail.toLowerCase() });

    if (userExists) {
      return res.status(409).send("Mail already taken. Choose another one!");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create user document and save it in database
    const user = await User.create({
      name,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    //create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        name: user.name,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).send("Error occured. Please try again!");
  }
};

module.exports = postSignup;
