const databaseConection = require("../db");
const HandleError = require("./handleError");
const User = require("../models/userModel");

async function getUsers() {
  console.log("getting users!!!!!!!!!!!!!!!!!!!!!!!!!!");
  const db = await databaseConection.GetConection();
  const users = await db.collection("Users").find();
  console.log(users);
  return users;
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

  return createdUser;
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
  CreateUserException: CreateUserException,
};
