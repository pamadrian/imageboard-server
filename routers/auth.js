const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

// old login endpoint
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!req.body.email || req.body.email === "") {
      res.status(400).send({
        message: "Please supply a valid email and password",
      });
      // tot hierboven
    } else if (!req.body.password || req.body.password === "") {
      res.status(400).send("missing email or password");
    } else {
      res.send({
        jwt: toJWT({ userId: 1 }),
      });
    }
  } catch (e) {
    next(e);
  }
});

// new login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    // 1. find user based on email address
    // 2. use bcrypt.compareSync to check the received password against the stored hash
    // 3. if the password is correct, return a JWT with the userId of the user (user.id)

    res.send({
      jwt: toJWT({ userId: 1 }),
    });
  }
});

module.exports = router;
