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

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(result => {
      if (!result) {
        res
          .status(404)
          .json({ errorMessage: `A user with an ID of ${id} was not found.` });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
  //   const user = Users.findById(id);

  //   try {
  //     if (user) {
  //       console.log(user);
  //       res.status(200).json(user);
  //     } else {
  //       res
  //         .status(404)
  //         .json({ message: "A user with the id of " + id + " was not found." });
  //     }
  //   } catch (error) {
  //     res.status(500).json(error);
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
