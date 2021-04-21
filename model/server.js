const express = require("express");
const cors = require("cors")

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json())
  }

  routes() {
    this.app.use("/api/mailer", require("../routes/mailer"))
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Server started at: http://localhost:${this.port}`)
    })
  }

};

module.exports = Server;