const express = require("express");
const ws = require("ws");
const cors = require("cors");
const app = express();
app.use(cors());
const wsServer = new ws.Server({ noServer: true });
const fs = require("fs");
const uuid = require("uuid").v4;

const data = JSON.parse(fs.readFileSync("./data.json"));

setInterval(() => {
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {});
}, 10000);

wsServer.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(String(msg));
  });
});
// req, res, data, errorMsg
const findByIdAndSend = (req, res) => {
  const { data, errorMsg } = req.dataFindByIdAndSend;
  const result = data.filter((elem) => elem.id == req.params.id);
  if (result.length == 1) {
    res.send(result[0]);
  } else {
    res.send({ error: errorMsg });
  }
};

app.use(express.json());

app.get("/api/locations", (req, res) => {
  res.send(data.locations);
});

app.get(
  "/api/locations/:id",
  (req, res, next) => {
    req.dataFindByIdAndSend = {
      data: data.locations,
      errorMsg: "Device was not found",
    };
    next();
  },
  findByIdAndSend
);

app.post("/api/locations/create", (req, res) => {
  const { name } = req.body;
  const id = uuid();
  const newLocation = { name, id };
  data.locations.push(newLocation);
  res.send(newLocation);
});

app.post("/api/locations/update/:id", (req, res) => {
  const { name } = req.body;
  const id = req.params.id;

  let foundLocation = false;
  data.locations = data.locations.map((location) => {
    if (location.id == id && !foundLocation) {
      location = { ...location, name };
      foundLocation = location;
    }
    return location;
  });

  if (!foundLocation) {
    res.send({ error: "Location not found" });
  } else {
    res.send(foundLocation);
  }
});

app.get("/api/devices", (req, res) => {
  res.send(data.devices);
  // wsServer.clients.forEach(clientSock=>{
  //     if(clientSock.readyState == ws.WebSocket.OPEN) {
  //         clientSock.send(JSON.stringify({data:"hello"}));
  //     }
  // })
});

app.get(
  "/api/devices/:id",
  (req, res, next) => {
    req.dataFindByIdAndSend = {
      data: data.devices,
      errorMsg: "Device was not found",
    };
    next();
  },
  findByIdAndSend
);

app.post("/api/devices/update/:id", (req, res) => {
  const { location: locationId, currentSurvey } = req.body;
  const foundSurveys = data.surveys.filter(
    (survey) => survey.id == currentSurvey
  ).length;
  if (foundSurveys == 0) {
    res.send({ error: "Survey not found" });
    return;
  }

  const foundLocations = data.locations.filter(
    (location) => location.id == locationId
  ).length;
  if (foundLocations == 0) {
    res.send({ error: "Location not found" });
    return;
  }

  const id = req.params.id;
  let foundDevice = false;
  data.devices = data.devices.map((device) => {
    if (device.id == id && !foundDevice) {
      device = { ...device, locationId, currentSurvey };
      foundDevice = device;
    }
    return device;
  });

  if (!foundDevice) {
    res.send({ error: "Device not found" });
  } else {
    res.send(foundDevice);
  }
});

app.get("/api/surveys", (req, res) => {
  res.send(data.surveys);
});

app.get(
  "/api/surveys/:id",
  (req, res, next) => {
    req.dataFindByIdAndSend = {
      data: data.surveys,
      errorMsg: "Survey was not found",
    };
    next();
  },
  findByIdAndSend
);

app.post("/api/surveys/create", (req, res) => {
  const {
    name,
    dtcreation,
    dtend,
    survey: { question, answers },
  } = req.body;
  if (answers.length <= 2 && answers.length > 4) {
    res.send({ error: "We expect 3 or 4 answers." });
    return;
  }
  if (!Number.isInteger(dtcreation) || !Number.isInteger(dtend)) {
    res.send({
      error:
        "Creation date or End date of the survey are invalid, we expected an integer js timestamp.",
    });
    return;
  }
  const id = uuid();
  const newSurvey = {
    name,
    dtcreation,
    dtend,
    survey: { question, answers },
    id,
    data: [],
  };
  data.surveys.push(newSurvey);
  res.send(newSurvey);
});

app.post("/api/surveys/update/:id", (req, res) => {
  const {
    name,
    dtcreation,
    dtend,
    survey: { question, answers },
  } = req.body;
  if (answers.length <= 2 && answers.length > 4) {
    res.send({ error: "We expect 3 or 4 answers." });
    return;
  }
  if (!Number.isInteger(dtcreation) || !Number.isInteger(dtend)) {
    res.send({
      error:
        "Creation date or End date of the survey are invalid, we expected an integer js timestamp.",
    });
    return;
  }
  const id = req.params.id;
  let foundSurvey = false;
  data.surveys = data.surveys.map((survey) => {
    if (survey.id == id && !foundSurvey) {
      survey = {
        ...survey,
        name,
        dtcreation,
        dtend,
        survey: { question, answers },
      };
      foundSurvey = survey;
    }
    return survey;
  });
  if (!foundSurvey) {
    res.send({ error: "Survey not found." });
  } else {
    res.send(foundSurvey);
  }
});

server = app.listen(3000);

server.on("upgrade", (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (socket) => {
    wsServer.emit("connection", socket, req);
  });
});
