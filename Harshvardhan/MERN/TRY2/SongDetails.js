const mongoose=require('mongoose')

const MusicDetailSchema=new mongoose.Schema({
    Songname:String,
    Filmname:String,
    Musicdirector:String,
    Singer:String,
    Actor:String,
    Actress:String
})

const MusicDetails=mongoose.model('Musicdetails',MusicDetailSchema)
module.exports= MusicDetails