const express=require('express')
const mongoose=require('mongoose')
const StudentMarks=require('./StudentMarks')
const app=express()
app.use(express.json())
const dbcnt="mongodb+srv://hnp:hnp@cluster0.ov0ol6q.mongodb.net/Assignment1?retryWrites=true&w=majority"
const port=4321

// c
app.post("/add",async function(req,res){
    const {Name,Roll_No,WAD_Marks,CC_Marks,CNS_Marks,DSBDA_Marks,AI_Marks}=req.body
    const student=await StudentMarks.create({Name,Roll_No,WAD_Marks,CC_Marks,CNS_Marks,DSBDA_Marks,AI_Marks})
    res.send({message:"Inserted",student})
})

// d
app.get("/allwithcnt",async function(req,res){
    const student=await StudentMarks.find()
    res.send({"Total_Count":student.length,student})
})

//e
app.get("/dsbda20",async function(req,res){
    const student=await StudentMarks.find({DSBDA_Marks:{$gt:20}},{Name:1})
    res.send(student)
})

//f
app.put("/updt/:studentID",async function(req,res){
    const studentID=req.params._id
    const student=await StudentMarks.findByIdAndUpdate({_id:studentID},{$inc:{WAD_Marks:10,CC_Marks:10,CNS_Marks:10,DSBDA_Marks:10,AI_Marks:10}},{new:true})
    res.send(student)
})

//g

app.get("/more25",async function(req,res){
    const student=await StudentMarks.find({
        WAD_Marks:{$gt:25},
        CC_Marks:{$gt:25},
        CNS_Marks:{$gt:25},
        DSBDA_Marks:{$gt:25},
        AI_Marks:{$gt:25}
    },{Name:1})
    let html="List"
    student.map(function(student)
    {

        html+="<li>"
        html+=student.Name
        html+="</li>"
    })
    res.send(html)
})
//h
app.get("/less40",async function(req,res){
    const student=await StudentMarks.find({
        WAD_Marks:{$lt:40},
        CC_Marks:{$lt:40}
    })
    let html="List"
    student.map(function(student){
        html+="<li>"
        html+=student.Name
        html+="</li>"
    })
    res.send(html)
})
//i
app.delete("/del/:studentID",async function(req,res){
    const studentID=req.params._id
    const student=await StudentMarks.findByIdAndDelete({_id:studentID})
    res.send(student)
})

//g
app.get("/entire",async function(req,res){
    const student=await studentMarks.find()
    let html="<table border=1>"
    html+=
    `
    <tr>
    <th>
    Name
    </th>
    <th>
    Roll_No
    </th>
    <th>
    WAD
    </th>
    <th>
    CC
    </th>
    <th>
    CNS
    </th>
    <th>
    DSBDA
    </th>
    <th>
    AI
    </th>
    </tr>
    `
    student.map(function(student){
        html+="<tr>"
        html+="<td>"+student.Name+"</td>"
        html+="<td>"+student.Roll_No+"</td>"
        html+="<td>"+student.WAD_Marks+"</td>"
        html+="<td>"+student.CC_Marks+"</td>"
        html+="<td>"+student.DSBDA_Marks+"</td>"
        html+="<td>"+student.CNS_Marks+"</td>"
        html+="<td>"+student.AI_Marks+"</td>"
        html+="</tr>"
    })
    html+="</table>"
    res.send(html)
})

app.listen(port,()=>{
    mongoose.connect(dbcnt)
    console.log("conncetd");
})