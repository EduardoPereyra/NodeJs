import { Router } from "express";
var router = Router();

function sumar() {
  return 1 + 2;
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (sumar() === 2) {
    res.send("respond with a resource");
  } else {
    res.status(500);
    res.render("error", {
      message: "Error en la función sumar",
      error: {
        status: 500,
      },
    });
  }
});

export default router;
