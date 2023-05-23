const mongoose=require('mongoose')

const SongDetailSchema=new mongoose.Schema({
    Songname:String,
    Filmname:String,
    Musicdirector:String,
    Singer:String,
    Actor:String,
    Actress:String
})

const SongDeatil=mongoose.model('songdetails',SongDetailSchema)
module.exports=SongDeatil