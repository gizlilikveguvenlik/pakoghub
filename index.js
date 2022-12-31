//static
const port = 8000
const dburi = 'mongodb+srv://pakog:pakog@cluster0.a4k9d3r.mongodb.net/?retryWrites=true&w=majority'
// express
const express = require('express')
const app = express()


// handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({extname: '.hbs'}))
app.set('view engine', 'hbs')

//body parser
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
//mongoose
const mongoose = require('mongoose')
mongoose.connect(dburi,{useUnifieldTopology:true}).then(()=>{
	console.log('db connected')
}).catch((e)=>{
	console.error(e)
})

const Video = require('./models/video.js')


//main
app.get('/',(req,res)=>{
	res.render('index')
})
//admin upload videos
app.get('/admin/new-video', (req,res)=>{
	res.render('admin/new-video')
})
app.post('/admin/new-video',(req,res)=>{
	const {baslik, aciklama, link} = req.body

	const newVideo = new Video({baslik,aciklama,link})
	newVideo.save().then(()=>{
		res.redirect('/')
	}).catch((err)=>{
		console.error(err)
	})
})


//listening
app.listen(port, ()=>console.log(`server running on port: ${port}`))