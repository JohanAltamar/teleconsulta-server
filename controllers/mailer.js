const nodemailer = require("nodemailer");
const recomendaciones = require("../utils/recomendaciones");

const sendProcess = async (req, res) => {
  try {
    const files = await attachFiles2(req.files.file)
    await sendMail(JSON.parse(req.body.mailInfo), files);
    return res.json({ msg: 'Email enviado con éxito' })
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal, contacte al admin"
    })
  }
}

const attachFiles2 = async (files) => {
  return files.map(({ name: filename, tempFilePath: path }) => ({
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