const express = require('express')
const mongoose = require('mongoose')
const Musicdetails = require('./SongDetails')

const app = express()
app.use(express.json())

const dbct = "mongodb+srv://hnp:hnp@cluster0.5jcu1ft.mongodb.net/Assignment2?retryWrites=true&w=majority"
const port = 4321

//c
app.post("/add", async function (req, res) {
    const { Songname, Filmname, Musicdirector, Singer } = req.body
    const song = await Musicdetails.create({ Songname, Filmname, Musicdirector, Singer })
    res.send(song)
})


//d
app.get("/cnt", async function (req, res) {
    const song = await Musicdetails.find()
    res.send({ "Total": song.length, song })
})

//e
app.get("/sng/:dir", async function (req, res) {
    const dir = req.params.dir
    const song = await Musicdetails.find({ Musicdirector: dir })
    res.send(song)
})

//f
app.get("/sng/:dir/:sg", async function (req, res) {
    const dir = req.params.dir
    const sg = req.params.sg
    const song = await Musicdetails.find({ Musicdirector: dir, Song: sg })
    res.send(song)
})

//g
app.delete("/del/:sg", async function (req, res) {
    const sg = req.params.sg
    const song = await Musicdetails.deleteOne({ Songname: sg })
    res.send(song)
})

//h
app.put("/upd", async function (req, res) {
    const { id, Actor, Actress } = req.body
    const song = Musicdetails.findByIdAndUpdate({ _id: id }, {
        $set: {
            Actor, Actress
        }
    }, { new: true })
    res.send(song)
})

//last

app.get("/all", async function (req, res) {
    const song = await Musicdetails.find()
    let html = "<table border=1>"
    html +=
        `
    <tr>
    <th>
    Songname
    </th>
    <th>
    Filmname
    </th>
    <th>
    Musicdirector
    </th>
    <th>
    Singer
    </th>
    <th>
    Actor
    </th>
    <th>
    Actress
    </th>
    </tr>
    
    `
    song.map(function (song) {
        html += "<tr>"
        html += "<td>" + song.Songname + "</td>"
        html += "<td>" + song.Filmname + "</td>"
        html += "<td>" + song.Musicdirector + "</td>"
        html += "<td>" + song.Singer + "</td>"
        html += "<td>" + song.Actor + "</td>"
        html += "<td>" + song.Actress + "</td>"
        html += "</tr>"
    })
    html += "</table>"
    res.send(song)
})

app.listen(port, () => {
    mongoose.connect(dbct)
    console.log("Connected");
})