const { Router, response } = require("express");
const Image = require("../models").image;
const router = new Router();

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

module.exports = router;
