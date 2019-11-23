// Dependencies
// ===========================================================
var express = require("express");
var app = express();
const path = require("path");
var PORT = process.env.PORT || 3000;

// set up the express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// Data
// ===========================================================
const rsvp = [];
const waitlist = [];

// Routes
// =============================================================

// HTML Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/view.html"));
});

// API Routes
app.get("/api/rsvp", function(req, res) {
  return res.json(rsvp);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.post("/api/tables", (req, res) => {
  // getting the raw data from client
  // format for my database
  if (rsvp.length < 4) {
    rsvp.push(req.body);
    res.json(true);
  } else {
    waitlist.push(req.body);
    res.json(false);
  }
});
app.post("/api/clear", (req, res) => {
  rsvp.length = 0;
  waitlist.length = 0;
  res.json(true);
});

app.post("/api/view", (req, res) => {
  // getting the raw data from client
  // format for my database
  waitlist.push(req.body);
  res.json(false);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
