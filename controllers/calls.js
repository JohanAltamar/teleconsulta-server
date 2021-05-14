const { Response } = require("express");
const fs = require('fs');
var json2xls = require('json2xls');

const Call = require("../model/calls");

const convert = async (data, filename) => {
  const xls = await json2xls(data);
  fs.writeFileSync(filename, xls, 'binary', (err) => {
    if (err) {
      console.log("writeFileSync :", err);
    }
    console.log(filename + " file is saved!");
  });
}

const getReport = async (req, res = Response) => {
  try {
    const { creadoPor } = req.query;

    if (!creadoPor) {
      return res.status(400).json({ msg: "creadoPor is missing" })
    }

    // SETTING DATE FOR FILTERING
    let date = new Date();
    date.setHours(02) // 02 AM hour

    // CALLS ARRAY
    const calls = await Call.find({ createdAt: { $gt: date }, creadoPor });
    const stringify = JSON.stringify(calls);
    const parsed = JSON.parse(stringify);

    await convert(parsed, `report-${creadoPor}.xlsx`);
    res.download(`./report-${creadoPor}.xlsx`)
    // res.json(calls)

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Something failed, contact the administrator" })
  }
}

const registerCall = async (req, res) => {
  try {
    const { body } = req;
    const newCall = new Call(body);
    await newCall.save();
    res.json(newCall)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something failed, contact the administrator" })
  }

}

module.exports = {
  getReport,
  registerCall,
}