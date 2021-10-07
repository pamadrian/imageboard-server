const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

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
// Here goes the login logic.

module.exports = router;
