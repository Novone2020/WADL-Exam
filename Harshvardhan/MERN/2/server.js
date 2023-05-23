const express = require('express')
const mongoose = require('mongoose')
const SongDeatil = require('./SongDetails')


const app = express()
app.use(express.json())
const dbcnt = "mongodb+srv://hnp:hnp@cluster0.5jcu1ft.mongodb.net/Assignement2?retryWrites=true&w=majority"
const port = 4321

//a & f
app.post("/add", async function (req, res) {
    const { Songname, Filmname, Musicdirector, Singer } = req.body
    const student = await SongDeatil.create({ Songname, Filmname, Musicdirector, Singer })
    res.send(student)
})

//b
app.get("/cnt", async function (req, res) {
    const student = await SongDeatil.find()
    res.send({ "Total_Count": student.length, student })
})

//c
app.get("/getdir/:dir", async function (req, res) {
    const Directorname = req.params.dir
    const student = await SongDeatil.find({ Musicdirector: Directorname })
    res.send(student)
})

//d
app.get("/getdir/:dir/:sing", async function (req, res) {
    const Directorname = req.params.Directorname
    const Singers = req.params.Singers
    const student = await SongDeatil.find({ Musicdirector: Directorname, Singer: Singers })
    res.send(student)
})
//e
app.delete("/del/:song", async function (req, res) {
    const song = req.params.song
    const student = await SongDeatil.deleteOne({ Songname: song })
    res.send(student)
})
//g
app.get("/gt/:sigr/:flm", async function (req, res) {
    const sigr = req.params.sigr
    const flm = req.params.flm
    const student =await SongDeatil.find({ Singer: sigr, Filmname: flm })
    res.send(student)
})

//h
app.put("/updr", async function (req, res) {
    const { songID, Actor, Actress } = req.body
    const student = await SongDeatil.findOneAndUpdate({ _id: songID }, {
        $set: {
            Actor, Actress
        }
    },
        { new: true }
    )
    res.send(student)
})


//i
app.get("/all", async function (req, res) {
    const student = await SongDeatil.find()
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
    student.map(function (student) {
        html += "<tr>"
        html += "<td>" + student.Songname + "</td>"
        html += "<td>" + student.Filmname + "</td>"
        html += "<td>" + student.Musicdirector + "</td>"
        html += "<td>" + student.Singer + "</td>"
        html += "<td>" + student.Actor + "</td>"
        html += "<td>" + student.Actress + "</td>"
        html += "</tr>"
    })
    html += "</table>"
    res.send(html)
})



app.listen(port, () => {
    mongoose.connect(dbcnt)
    console.log("Connected");
})