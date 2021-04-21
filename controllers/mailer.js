const multer = require("multer");
const nodemailer = require("nodemailer");
const recomendaciones = require("../utils/recomendaciones");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).array('file')

const sendProcess = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    // TRANSFORM FILES INFO TO BE PASSED TO SENDMAIL FUNCTION
    const files = await attachFiles(req.files)

    // PASS MAIL INFO AND ATTACHMENTS
    await sendMail(JSON.parse(req.body.mailInfo), files);

    res.status(200).send(req.files)
    return
  })
}

const attachFiles = async (files) => {
  return files.map(({ filename, path }) => ({
    filename, path
  }))
}

const sendMail = async (body, attachments) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      type: "login",
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    to: body.to,
    from: body.from,
    subject: body.subject,
    text: `${body.text}
    
    ${recomendaciones}`,
    attachments
  });
}

module.exports = {
  sendProcess,
}