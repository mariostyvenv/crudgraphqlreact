import {Clientes} from './db'

export const resolvers = {
    Query:{
        getClientes: (root, {limite}) =>{
            return Clientes.find({}).limit(limite)
        },
        getCliente: (root, {id}) =>{
            return new Promise((resolve, reject)=>{
                Clientes.findById(id, (error, cliente)=>{
                    if(error) reject (error)
                    else resolve(cliente)
                })
            })
        }
    },
    Mutation:{
        crearCliente: (root, {input}) => {

            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos,
                emails : input.emails,
            })

            nuevoCliente.id = nuevoCliente._id

            return new Promise((resolve, reject) =>{
                nuevoCliente.save((error)=>{
                    if(error) reject(error)
                    else resolve(nuevoCliente)
                })
            })
        },
        actualizarCliente: (root, {input}) => {

            return new Promise((resolve, object) => {

                Clientes.findOneAndUpdate({_id: input.id}, input, {new:true}, (error, cliente) => {
                    if(error) reject(error)
                    else resolve(cliente)
                })
            })
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, reject) =>{
                Clientes.findOneAndRemove({_id: id}, (error) => {
                    if(error) reject(error)
                    else resolve("Se elimino correctamente")
                })
            })
        }
    }
}