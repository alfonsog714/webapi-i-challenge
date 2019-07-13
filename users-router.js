const express = require("express");
const router = express.Router();
const Users = require("./data/db.js");

router.use(express.json());

router.get("/", (req, res) => {
  Users.find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  //   try {
  //     const users = Users.find();
  //     // console.log(users);
  //     res.status(200).json(users);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: "Error retrieving users." });
  //   }
});

router.post("/", async (req, res) => {
  if (!isValidUser(req.body)) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(req.body)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

isValidUser = user => {
  const { name, bio } = user;
  return name && bio;
};

module.exports = router;
