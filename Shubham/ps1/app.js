const express = require('express');
const mongoose = require('mongoose');
const Student = require('./model/student');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post('/addmarks', async (req, res) => {
  try {
    var myData = new Student(req.body);
    const student = await Student.create(myData);
    res.redirect('/getmarks');
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/getmarks', async (req, res) => {
  try {
    const students = await Student.find({});
    const count = students.length;
    res.render('table', { students: students, count: count });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/dsbdagreaterthan20', async (req, res) => {
  try {
    const students = await Student.find({ dsbda_marks: { $gt: 20 } });
    const count = students.length;
    res.render('table', { students: students, count: count });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/wadccgreaterthan20', async (req, res) => {
  try {
    const students = await Student.find({
      wad_marks: { $gt: 20 },
      cc_marks: { $gt: 20 },
    });
    const count = students.length;
    res.render('table', { students: students, count: count });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post('/deleteStudent/:id', async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  res.redirect('/getmarks');
});

app.post('/updateby10/:id', async (req, res) => {
  const stu = await Student.findById(req.params.id);
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      wad_marks: stu.wad_marks + 10,
      cc_marks: stu.cc_marks + 10,
      dsbda_marks: stu.dsbda_marks + 10,
      ai_marks: stu.ai_marks + 10,
      cns_marks: stu.cns_marks + 10,
    },
    req.body
  );

  res.redirect('/getmarks');
});

const start = async () => {
  try {
    await mongoose.connect('');
    app.listen(4000, () => {
      console.log('Connected to db and server is running on 4000');
    });
  } catch (error) {
    console.log('Error while connecting db');
  }
};
start();
