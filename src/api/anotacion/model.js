import mongoose, { Schema } from 'mongoose'

const anotacionSchema = new Schema({
  id_usuario: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now()
  },
  cuerpo: {
    type: String
  },
  id_ticket: {
    type: Schema.ObjectId,
    ref: 'Ticket',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

anotacionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      id_usuario: this.id_usuario.view(full),
      fecha: this.fecha,
      cuerpo: this.cuerpo,
      ticket: this.id_ticket.view(full), 
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Anotacion', anotacionSchema)

export const schema = model.schema
export default model
