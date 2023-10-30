const {getAllRecipes} = require("../model/recipes")

const RecipesController = {
	getRecipes: async(req,res,next)=>{

		let recipes = await getAllRecipes()
		let data = recipes.rows

		if(!data){
			res.status(404).json({messsage:'failed get data'})
		}
		res.status(200).json({messsage:'success get data', data})
	}
}

module.exports = RecipesController