const express = require("express");

const userRouter = require("./users-router.js");

const port = 4000;
const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h2>webapi challenge 1</h2>`);
});

server.use("/api/users", userRouter);

server.listen(port, () => {
  console.log("\n*** Server running on http://localhost:4000 ***\n");
});
