const express = require("express");

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }));


let users = [
	{"id":1, "name": "arif"},
	{"id":2, "name": "budi"},
	{"id":3, "name": "cecep"}
]

app.get('/users',(req,res,next)=>{
	res.json({messsage:'success',data:users})
})

app.get('/users/:id',(req,res,next)=>{
	let id = req.params.id
	console.log('get id ',id)
	let user;
	users.forEach((item=>{
		if(item.id == id){
			user = item
		}
	}))
	if(!user){
		res.status(404).json({messsage:'user not found'})
	}
	console.log('get id ',id)
	console.log('get user ',user)
	res.status(200).json({messsage:'success get data user',data:user})
})

app.delete('/users/:id',(req,res,next)=>{
	let id = req.params.id
	console.log('get id ',id)

	let user;
	let new_users = []
	users.forEach((item)=>{
		if(item.id == id){
			user = item
		} else {
			new_users = [...new_users,item]
		}
	})
	
	if(!user){
		res.status(404).json({messsage:'user not found failed delete data'})
	}

	users = [...new_users]
	res.json({messsage:`success delet user ${user.name} `,data:users})
})
app.put('/users/:id',(req,res,next)=>{
	let id = req.params.id
	let {name} = req.body
	console.log('get id ',id)
	console.log('get name ',name)

	let user;
	let new_users = users.map((item)=>{
		if(item.id == id){
			item.name = name
			user = item
			console.log('get new id & name ',item)
			return item
		} else {
			return item
		}
	})
	
	if(!user){
		res.status(404).json({messsage:'user not found failed update data'})
	}

	users = [...new_users]
	res.json({messsage:'success update user data',data:users})
})

app.post('/users',(req,res,next)=>{
	let {id,name} = req.body
	users = [...users,{"id":parseInt(id),name}]
	res.json({messsage:'success input users',data:users})
})

app.get('/',(req,res,next)=>{
	res.json({messsage:'success',data:'server success running on port 3000'})
})


app.listen(port,()=>{
	console.log(`app running on port ${port}`)
})