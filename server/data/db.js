import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true, useUnifiedTopology: true})

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    edad: Number,
    emails: Array,
    tipo: String,
    pedidos: Array
})

const Clientes = mongoose.model('clientes', clientesSchema)

export {Clientes}