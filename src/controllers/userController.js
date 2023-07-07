const databaseConection = require("../db");
const HandleError = require("./handleError");
const User = require("../models/userModel");

async function getUsers() {
  const db = await databaseConection.GetConection();
  const users = await db.collection("Users").find().toArray();
  return users;
}

async function getUser() {
  const db = await databaseConection.GetConection();
  const userExist = await db.collection("Users").findOne({ email: email });

  if (userExist) {
    console.log("Ya existe usuario");
  }
}

async function createUser(name, phone, email, password) {
  console.log(
    "---->CONTROLERname, phone, email, password",
    name,
    phone,
    email,
    password,
    "<-------"
  );
  const db = await databaseConection.GetConection();
  const doesEmailExist = await db.collection("Users").findOne({
    email: email,
  });

  if (doesEmailExist) {
    throw new CreateUserException(CreateUserException.emailAlreadyInUser);
  }

  let newUser = {
    name: name,
    phone: phone,
    email: email,
    password: password,
  };

  const createdUser = await db.collection("Users").insertOne(newUser);
  console.log(createUser);

  return createdUser;
}

async function deleteUser(userId) {
  const db = await databaseConection.GetConection();
  const deletedUser = await User.deleteOne({ _id: userId });

  // const deletedUser = await db.collection("Users").deleteOne({
  //   _id: userId,
  // });
  console.log(deletedUser);
}

class CreateUserException extends HandleError {
  static emailAlreadyInUser = "EMAIL_ALREADY_IN_USER";

  constructor(code) {
    super("Create User ", code);
  }
}

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  getUser: getUser,
  deleteUser: deleteUser,

  CreateUserException: CreateUserException,
};
