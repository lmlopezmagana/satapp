import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri).then(
  (connection) => { 
    console.log('Conectado!') 
    //console.dir(connection.connections[0].db)
    const db = connection.connections[0].db
    db.collection('sequences').countDocuments()
      .then((c) => {
        // console.log('Count ' + c)
        if (c < 1) {
          const tipos = ['PC', 'MON', 'IMP', 'RED', 'PER', 'OTR']
          const array = tipos.map((tipo) => { return {
                _id: tipo,
                sequence_value: 1
          }})
          db.collection('sequences').insertMany(array)
        }
      })
  },
  err => { console.log('Conectado con error!!!')}
);
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
