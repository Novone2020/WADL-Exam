const express = require('express');
const mongoose = require('mongoose');
const Songs = require('./model/songs');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/addsongs', async (req, res) => {
  try {
    const data = new Songs(req.body);

    const song = await Songs.create(data);
    res.redirect('/getsongs');
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/getsongs', async (req, res) => {
  try {
    const songs = await Songs.find({});
    const count = songs.length;
    res.render('table', { songs: songs, count: count });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post('/deletesong/:id', async (req, res) => {
  try {
    const song = await Songs.findByIdAndDelete(req.params.id);
    res.redirect('/getsongs');
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/specfic/:musicdir', async (req, res) => {
  try {
    const songs = await Songs.find({ music_director: req.params.musicdir });
    const count = songs.length;
    res.render('table', { songs: songs, count: count });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/specfic/:musicdir/:singer', async (req, res) => {
  try {
    const songs = await Songs.find({
      music_director: req.params.musicdir,
      singer: req.params.singer,
    });
    const count = songs.length;
    res.render('table', { songs: songs, count: count });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/specfic1/:singer/:film', async (req, res) => {
  try {
    const songs = await Songs.find({
      singer: req.params.singer,
      film: req.params.film,
    });
    const count = songs.length;
    res.render('table', { songs: songs, count: count });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post('/updatesong/:id', async (req, res) => {
  try {
    const song = await Songs.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/getsongs');
  } catch (error) {
    res.status(500).json({ error: error });
  }
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
