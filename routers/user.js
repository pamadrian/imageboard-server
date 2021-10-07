const { Router } = require("express");
const User = require("../models").user;
const router = new Router();

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
        password,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
