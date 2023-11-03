const {getAllRecipes, postRecipe,getRecipeById, putRecipe,deleteRecipeById, getCategory,getRecipes, getRecipesCount} = require("../model/recipes")

const RecipesController = {
	categoryAll: async(req,res,next)=>{
		let category = await getCategory()
		res.status(200).json({messsage:'success get category', data: category.rows})
	},
	getRecipesDetail: async(req,res,next)=>{

		let {search,searchBy,limit,sortBy} = req.query

		searchBy = searchBy || "title"
		let limiter = limit || 5
		let page = req.query.page || 1
		let asc = sortBy || 'ASC'

		console.log(req.query)

		let data ={
			searchBy,
			search: search || '',
			offset: (page - 1) * limiter,
			limit: limit || 3,
			asc
		}
		
		let recipes = await getRecipes(data)
		let result = recipes.rows
		let {rows} = await getRecipesCount(data)
		let count = parseInt(rows[0].count)
		console.log("count")
		console.log(count)

		let pagination = {
			totalPage : Math.ceil(count/limiter),
			totalData : count,
			pageNow: parseInt(page)
		}

		if(!result){
			return res.status(404).json({messsage:'failed get result'})
		}

		result.forEach((item,index)=>{
			let ingredients = item.ingredients.split(",")
			result[index].ingredients = ingredients
		})
		

		res.status(200).json({messsage:'success get data', data:result, dataLength:result.length,pagination})
	},
	getRecipes: async(req,res,next)=>{
		let recipes = await getAllRecipes()
		let data = recipes.rows

		if(!data){
			return res.status(404).json({messsage:'failed get data'})
		}

		data.forEach((item,index)=>{
			let ingredients = item.ingredients.split(",")
			data[index].ingredients = ingredients
			console.log(item.ingredients)
		})
		
		res.status(200).json({messsage:'success get data', data})
	},
	getRecipeId: async(req,res,next)=>{
		let id = req.params.id
		console.log('param id = ',id)
		let recipes = await getRecipeById(id)
		let data = recipes.rows[0]
		data.ingredients = data.ingredients.split(",")
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
		let {title, ingredients, photo, category_id} = req.body
		console.log(title, ingredients, photo, category_id)

		if(!title || !ingredients || !photo || !category_id){
			return	res.status(404).json({messsage:'failed input data, title, ingredients, photo, category_id is required'})
		}

		let category = await getCategory()
		let is_category = false
		category.rows.forEach(item => {
			if(item.id==category_id){
				is_category=true
			}
		});

		if(!is_category){
			return res.status(404).json({messsage:'category invalid'})
		}

		let data = {title,ingredients,photo,category_id: parseInt(category_id)}
		let result = await postRecipe(data)

		if(!result){
			return res.status(404).json({messsage:'failed input data'})
		}
		res.status(200).json({messsage:'success input data', data})
	},
	updateRecipe: async(req,res,next)=>{
		let id = req.params.id
		let {title, ingredients, photo, category_id} = req.body
		console.log(title, ingredients, photo, category_id)

		let recipe_data = await getRecipeById(id)

		if(recipe_data.rowCount == 0){
			return res.status(404).json({messsage:'failed, data not found'})
		}

		// check category
		let category = await getCategory()
		let is_category = false
		category.rows.forEach(item => {
			if(item.id==category_id){
				is_category=true
			}
		});

		if(!is_category){
			return res.status(404).json({messsage:'category invalid'})
		}

		let data = recipe_data.rows[0]
		
		let newData = {
			id : data.id,
			title: title || data.title,
			ingredients: ingredients || data.ingredients,
			photo: photo || data.photo,
			category_id: parseInt(category_id) || data.category_id
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