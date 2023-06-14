const express = require("express");
const {
  createUser,
  getUsers,
  CreateUserException,
} = require("../controllers/userController");
const usersRouter = express.Router();

usersRouter.get("/", async (request, response) => {
  let response_users = null;
  let response_result = null;

  try {
    response_users = await getUsers();
  } catch (error) {
    console.log(error.code);
    if (error.code != null) {
      response_result = error.code;
    } else {
      response_result = CreateUserException.unknownError;
    }
  }

  response.json({
    user: response_users,
    result: response_result,
  });
});

usersRouter.post("/", async (request, response) => {
  const name = request.body.name;
  const phone = request.body.phone;
  const email = request.body.email;
  const password = request.body.password;

  let response_user = null;
  let response_result = null;
  console.log(
    "---->route!!!!name, phone, email, password",
    request.body,
    "<-------"
  );
  if (!name || !email || !password) {
    response_result = CreateUserException.incorrectParameters;
  } else {
    try {
      response_user = await createUser(name, phone, email, password);
      console.log(response_user, "risponse user routesssSS");
      response_result = CreateUserException.success;
    } catch (error) {
      console.log(error.code);
      if (error.code != null) {
        response_result = error.code;
      } else {
        response_result = CreateUserException.unknownError;
      }
    }
  }

  response.json({
    user: response_user,
    result: response_result,
  });
});
module.exports = usersRouter;
