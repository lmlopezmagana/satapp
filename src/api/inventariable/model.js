import mongoose, { Schema } from 'mongoose'

const imgSchema = new Schema({
  data: String,
  contentType: String
})

export const tipos = ['PC', 'MONITOR', 'IMPRESORA', 'RED', 'PERIFERICO', 'OTRO']

const inventariableSchema = new Schema({
  codigo: {
    type: String
  },
  tipo: {
    type: String,
    enum: tipos
  },
  nombre: {
    type: String
  },
  descripcion: {
    type: String
  },
  ubicacion: {
    type: String
  },
  imagen: {
    type: imgSchema
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

inventariableSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      codigo: this.codigo,
      tipo: this.tipo,
      nombre: this.nombre,
      descripcion: this.descripcion,
      ubicacion: this.ubucacion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    if (this.imagen != undefined) {
      view.imagen='/inventariable/img/' + this.id
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Inventariable', inventariableSchema)

export const schema = model.schema
export default model
