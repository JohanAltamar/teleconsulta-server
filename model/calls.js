const { Schema, model } = require("mongoose");

const CallSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  cedula: { type: String, required: true, trim: true },
  telefono: { type: String, required: true, trim: true },
  tipo: {
    type: String,
    enum: ["alta no contactada", "efectivo", "no efectivo"]
  },
  creadoPor: { type: String, required: true, trim: true, enum: ["luz", "paula"] }
},
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const { _id, __v, createdAt, updatedAt, creadoPor, ...rest } = ret;

        return rest;
      },
    },
  })

module.exports = model("call", CallSchema);
