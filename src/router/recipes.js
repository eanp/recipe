const express = require("express")
const {getRecipes} = require("../controller/recipes")

const router = express.Router()

router.get('/',getRecipes)

module.exports = router;