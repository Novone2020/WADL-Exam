const express=require('express')
const mongoose=require('mongoose')
// const student_marks=require('./studentMarks')
const studentMarks = require('./studentMarks')
const app=express()
app.use(express.json())
const dbcnt="mongodb+srv://hnp:hnp@cluster0.ov0ol6q.mongodb.net/Assignment1?retryWrites=true&w=majority"
const port=4321
//add
app.post("/add",async function (req,res){
    const {Name,Roll_No,WAD_Marks,CC_Marks,DSBDA_Marks,CNS_Marks,AI_Marks}=req.body
    const student=await studentMarks.create({Name,Roll_No,WAD_Marks,CC_Marks,DSBDA_Marks,CNS_Marks,AI_Marks})
    res.send({message:"Data is Inserted",student})
})
//list
app.get("/displaycountanddocuments",async function(req,res){
    const student=await studentMarks.find()
    res.send({"Total_Count":student.length,student})
})
//dsbda >20
app.get("/dsbdagt20",async function(req,res){
    const student=await studentMarks.find({DSBDA_Marks:{$gt : 20}},{Name :1})
    res.send(student)
})

//update
app.put("/updatemark/:studentID",async function(req,res){
    const studentID=req.params.studentID
    const student=await studentMarks.findByIdAndUpdate({_id:studentID},{$inc:{WAD_Marks:10,CC_Marks:10,DSBDA_Marks:10,CNS_Marks:10,AI_Marks:10}},{new:true})
    res.send(student)
})

//list names
app.get("/getmore25",async function(req,res){
    const student=await studentMarks.find({
        WAD_Marks:{$gt:25},
        CC_Marks:{$gt:25},
        CNS_Marks:{$gt:25},
        DSBDA_Marks:{$gt:25},
        AI_Marks:{$gt:25}
    },{Name:1})
    let html="Got 25 or more"
    student.map(function(student)
    {
        html+="<li>"
        html+=student.Name
        html+="</li>"
    })
    res.send(html)
})
//list got less than 40
app.get("/lessthan40",async function(req,res){
    const student=await studentMarks.find({
        WAD_Marks:{$lt:40},
        CC_Marks:{$lt:40}
    },{Name:1})
    let html="less than 40"
    student.map(function(student){
        html+="<li>"
        html+=student.Name
        html+="</li>"
    })
    res.send(html)
})

//entire table show
app.get("/display",async function(req,res){
    const student=await studentMarks.find()

    let html="<table border=1>"
    html+=`
    <tr>
    <th>Roll_No</th>
    <th>WAD_Marks</th>
    <th>CC_Marks</th>
    <th>DSBDA_Marks</th>
    <th>CNS_Marks</th>
    <th>AI_Marks</th>
    </tr>
    `
    student.map(function(student){
        html+="<tr>"
        html+="<td>"+student.Name+"</td>"
        html+="<td>"+student.Roll_No+"</td>"
        html+="<td>"+student.WAD_Marks+"</td>"
        html+="<td>"+student.DSBDA_Marks+"</td>"
        html+="<td>"+student.CNS_Marks+"</td>"
        html+="<td>"+student.AI_Marks+"</td>"
        html+="</tr>"
    })
    html+="</table>"
    res.send(html)
})
//delete
app.delete("/delete/:studentID",async function(req,res){
    const studentID=req.params.studentID
    const deletestud=await studentMarks.findByIdAndDelete({_id:studentID})
    res.send({message:"deleted",deletestud})
})



app.listen(port,()=>{
    mongoose.connect(dbcnt)
    console.log('Connected');
})