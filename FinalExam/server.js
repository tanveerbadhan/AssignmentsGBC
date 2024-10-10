const express = require("express");
const mongoose = require("mongoose");
const Song = require("./models/song");
const PlaylistSong = require("./models/playlistSong");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const allSongs = await Song.find();
        const playlistSongs = await PlaylistSong.find();
        return res.render("home", { allSongs, playlistSongs });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post("/addtoplaylist", async (req, res) => {
    const song = JSON.parse(req.body.addsong);
    try {
        const ifAlreadyExists = await PlaylistSong.find({ title: song.title });

        if (ifAlreadyExists.length === 0) {
            const addToPlaylistSong = new PlaylistSong({
                title: song.title,
                artist: song.artist,
                image: song.image,
            });
            await addToPlaylistSong.save();
        }
        return res.redirect("/");
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post("/removefromplaylist", async (req, res) => {
    const song = JSON.parse(req.body.removeSong);
    try {
        await PlaylistSong.findByIdAndDelete(song._id);
        return res.redirect("/");
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post("/addsong", async (req, res) => {
    const song = req.body;
    try {
        const ifAlreadyExists = await Song.find({ title: song.nameofsong });

        if (ifAlreadyExists.length === 0) {
            const newSong = new Song({
                title: song.nameofsong,
                artist: song.nameofartist,
                image: song.imgurl,
            });
            await newSong.save();
        }

        return res.redirect("/");
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

const startServer = async () => {
    console.log(`The server is running on http://localhost:${port}`);
    console.log(`Press CTRL + C to exit`);

    // MongoDB Connection
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Success! Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

app.listen(port, startServer);
