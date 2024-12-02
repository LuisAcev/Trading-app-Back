import { request, response } from "express";
import { User } from "../models/usersModel.js";
import mongoose from "mongoose";

export const getUsers = async (req = request, res = response) => {
  try {
    const getEmail = req.query.email;
    const getpassword = req.query.password;

    if (!getEmail || !getpassword) {
      return res.status(401).send("password or email is mandatory");
    }

    const getUser = await User.findOne({
      email: getEmail,
      password: getpassword,
    });

    if (!getUser) {
      return res.status(401).send("User doesn't exist");
    } else {
      return res.status(200).send(getUser);
    }
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

export const postUsers = async (req = request, res = response) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(401).json({ msg: "User created" });
  }

  const user = new User({ fullname, email, password });

  await user.save();
  res.status(200).json({ user, msg: "User created" });
};

export const putUsers = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const bodyupdate = req.body;

    // Verifica que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Actualiza el usuario y devuelve el documento actualizado
    const updatedUser = await User.findByIdAndUpdate(id, bodyupdate, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ message: "User Updated", user: updatedUser });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const deletUsers = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    // Verifica que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deletUsers) {
      res.status(404).send("user not found");
    }
    res.status(200).send({ message: "User deleted", user: deleteUser });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
