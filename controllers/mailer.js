const nodemailer = require("nodemailer");
const recomendaciones = require("../utils/recomendaciones");

const sendProcess = async (req, res) => {
  try {
    const files = req.files ? await attachFiles2(req.files) : []
    await sendMail(JSON.parse(req.body.mailInfo), files);
    return res.json({ msg: 'Email enviado con éxito' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Algo salió mal, contacte al admin",
      code: error.code
    })
  }
}

const attachFiles2 = async (files) => {
  // Files is an object.
  return Object.keys(files).map(itemName => files[itemName] = {
    filename: files[itemName].name, path: files[itemName].tempFilePath
  })
}

const sendMail = async (body, attachments) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      type: "login",
      user: body.from,
      pass: body.password,
    },
  });

  let info = await transporter.sendMail({
    to: body.to,
    from: body.from2,
    subject: body.subject,
    text: `${body.text}
    
    ${recomendaciones}`,
    attachments
  });
}

module.exports = {
  sendProcess,
}