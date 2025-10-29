import generateToken from "../lib/generateToken.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select("+password");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found.",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = await generateToken(user._id);
    res.status(200).json({
      status: true,
      message: "user signed in",
      session_code: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, email, name, address, password } = req.body;

    const user = await userModel.findOne({ username });

    if (user) {
      return res.status(404).json({
        status: false,
        message: "Username is already taken",
      });
    }
    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
      return res.status(404).json({
        status: false,
        message: "Email is already taken",
      });
    }

    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username,
      name,
      email,
      address,
      password: hashedPassword,
      isAdmin: username === "jrts_31" ? true : false,
    });

    const token = generateToken(newUser._id);

    res.status(200).json({
      status: true,
      message: "user signed up",
      session_code: token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
