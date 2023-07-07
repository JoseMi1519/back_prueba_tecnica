const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser,
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

usersRouter.delete("/", async (request, response) => {
  console.log("Hola desde el ApiIIIIIIIIIIIIIIIIIIII", request.body);
  let response_delete = null;
  try {
    response_delete = await deleteUser();
  } catch (error) {
    console.log(error);
  }

  response.json({
    result: response_delete,
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
  console.log("==============================");
  console.log(response_user);
  console.log(response_result);
  console.log("==============================");
  response.json({
    user: response_user,
    result: response_result,
  });
});
module.exports = usersRouter;
