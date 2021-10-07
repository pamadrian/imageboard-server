const { Router } = require("express");
const User = require("../models").user;
const router = new Router();
const bcrypt = require("bcrypt");

router.get("/", (request, response) => response.send([User]));

//create a new user
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const newUser = await User.create({
        email,
        // Here, when handing down the password to the create method we hash it.
        password: bcrypt.hashSync(password, 10),
        fullName,
      });

      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
