const router = require("express").Router();

const user = require("./routers/userRouter");
// const cliente = requier;

router.use("/user", user);
// router.use("/cliente", cliente);

module.exports = router;
