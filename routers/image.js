const { Router, response } = require("express");
const Image = require("../models").image;
const router = new Router();
const { toData } = require("../auth/jwt"); // because there is more exported, take that one thing you need.

router.get("/", (request, response) => response.send([Image]));

router.post("/", async (request, response) => {
  console.log(request.body);
  const new_image = await Image.create(request.body);
  response.send(new_image);
}); // to create a new image in the database

// Get one image
router.get("/", async (request, response, next) => {
  try {
    const specificImage = await Image.findOne({ where: { title: "test" } });
  } catch (e) {
    console.error(e);
  }
});

// Protecting images
router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

module.exports = router;
