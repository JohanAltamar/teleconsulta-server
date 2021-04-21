const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")

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
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }));
  }

  routes() {
    this.app.use("/api/mailer", require("../routes/mailer"))
    this.app.use(fileUpload());
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Server started at: http://localhost:${this.port}`)
    })
  }

};

module.exports = Server;