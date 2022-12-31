const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
	baslik:{type: String},
	aciklama:{type: String},
	link:{type: String}
})
const Video = mongoose.model('video', VideoSchema)
module.exports=Video