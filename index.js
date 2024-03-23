// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const https = require('https');
const fs = require('fs');

// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const aigrading = require("./routes/aigrading");
const aihelper = require("./routes/aihelper");

// INIT
const PORT = process.env.PORT || 4577;
const app = express();
const DB =
  "mongodb://mongodb:mongodb@192.168.0.15:40003/";

// SSL Certificate
const privateKey = fs.readFileSync('certificate/privkey.pem', 'utf8');
const certificate = fs.readFileSync('certificate/cert.pem', 'utf8');
//const ca = fs.readFileSync('./certificate/cert.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
};

// middleware
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(aigrading);
app.use(aihelper);

// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

https.createServer(credentials, app).listen(PORT, "0.0.0.0", () => {
  console.log(`---------The backend server is running---------`);
  console.log(`The server is running on port ${PORT}`);
});