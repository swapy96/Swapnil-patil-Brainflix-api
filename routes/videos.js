const express = require("express");
const router = express.Router();
const app = express();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
app.use(express.json());

function readFile(file, callback) {
  fs.readFile(file, "utf8", callback);
}

function writeFile(file, data, callback) {
  fs.writeFile(file, JSON.stringify(data), callback);
}

router.get("/", (req, res) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return res.send(err);
    }
    res.json(JSON.parse(data));
  });
});

router.get("/:id", (req, res) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return res.send(err);
    }
    const videos = JSON.parse(data);

    const foundVideo = videos.find((video) => video.id === req.params.id);

    if (foundVideo) {
      res.json(foundVideo);
    } else {
      res.status(400).send(`no video with the id ${req.params.id} found`);
    }
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  const title = body.title;
  const description = body.description;
  const image = "https://i.imgur.com/l2Xfgpl.jpg";

  if (!title || !description) {
    res.status(400).send("Title and Description can not be empty");
    return;
  }
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return res.send(err);
    }

    videosData = JSON.parse(data);

    const newVideoUpload = {
      id: uuidv4(),
      title,
      channel: "Web Dev",
      image,
      description,
      views: "5,490,099",
      likes: "7,399,055",
      duration: "4:30",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [
        {
          id: "2d818087-c1f4-4ec2-bcdc-b545fd6ec258",
          name: "Martin Evergreen",
          comment:
            "I’ve loved trains ever since I was a child. I dreamed about riding one around the world. This is the most fantastic thing I’ve seen yet, and I’m watching it ON a train!",
          likes: 3,
          timestamp: 1632512763000,
        },
        {
          id: "191de346-b3c2-47b4-bf5b-6db90d1e3bdc",
          name: "Emily Harper",
          comment:
            "Let’s collaborate on a video for saving money on cheap train tickets! I’ll have my associates contact yours.",
          likes: 0,
          timestamp: 1632496261000,
        },
      ],
    };

    videosData.push(newVideoUpload);

    // write back to json file.save the new video
    writeFile("./data/video-details.json", videosData, (err) => {
      if (err) {
        return res.status("error writing file");
      }
      res.status(201).send("New video uploaded Successfully!");
    });
  });
});

module.exports = router;
