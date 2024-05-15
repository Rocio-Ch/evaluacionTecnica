import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("Test conocimientos tecnicos TANDEM")
})


export default server;
