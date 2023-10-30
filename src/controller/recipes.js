const {getAllRecipes, postRecipe,getRecipeById, putRecipe,deleteRecipeById} = require("../model/recipes")

const RecipesController = {
	getRecipes: async(req,res,next)=>{
		let recipes = await getAllRecipes()
		let data = recipes.rows

		if(!data){
			return res.status(404).json({messsage:'failed get data'})
		}
		res.status(200).json({messsage:'success get data', data})
	},
	getRecipeId: async(req,res,next)=>{
		let id = req.params.id
		console.log('param id = ',id)
		let recipes = await getRecipeById(id)
		let data = recipes.rows[0]
		if(!data){
			return res.status(404).json({messsage:'failed get data'})
		}
		res.status(200).json({messsage:'success get data', data})
	},
	deleteRecipeId: async(req,res,next)=>{
		let id = req.params.id
		console.log('param id = ',id)
		let recipes = await deleteRecipeById(id)
		console.log('recipes ',recipes)
		if(recipes.rowCount == 0){
			return res.status(404).json({messsage:'failed delete data'})
		}
		res.status(200).json({messsage:'success delete data'})
	},
	inputRecipe: async(req,res,next)=>{
		let {title, content} = req.body
		console.log('title>',title,' - content>',content)

		if(!title || !content){
			return	res.status(404).json({messsage:'failed input data, title & content required'})
		}

		let data = {title,content}
		let result = await postRecipe(data)
		console.log(result)

		if(!result){
			return res.status(404).json({messsage:'failed input data'})
		}
		res.status(200).json({messsage:'success input data', data})
	},
	updateRecipe: async(req,res,next)=>{
		let id = req.params.id
		let {title, content} = req.body
		console.log('id>',id,' - title>',title,' - content>',content)

		let recipe_data = await getRecipeById(id)

		if(recipe_data.rowCount == 0){
			return res.status(404).json({messsage:'failed, data not found'})
		}

		let data = recipe_data.rows[0]

		let newData = {
			id : data.id,
			title: title || data.title,
			content: content || data.content,
		}

		console.log(data)

		let result = await putRecipe(newData)
		console.log(result)

		if(!result){
			return res.status(404).json({messsage:'failed update data'})
		}
		res.status(200).json({messsage:'success update data'})
	}
}

module.exports = RecipesController