import React, {Fragment, useEffect, useState} from 'react'
import {Query, Mutation} from 'react-apollo'
import {CLIENTES_QUERY} from '../queries'
import {ELIMINAR_CLIENTE} from '../mutations'
import { Link, Redirect} from 'react-router-dom'

const Contactos = (props) => {

    const [list, setList] = useState([])

    return(
        <Query query={CLIENTES_QUERY} fetchPolicy='network-only'>
            {({loading, error, data}) => {

                if(loading) return "Cargando..."
                if(error) return `Error: ${error.message}`
                
                return(
                    <Prueba data={data} loading={loading} error={error}/> 
                )
            }}
        </Query>
    )
}
const Prueba = ({data, loading, error}) => {

    useEffect(() => {
        
    },[data])

    return (
        <Fragment>
            <h2 className="text-center">Listado Clientes</h2>
            <ul className="list-group mt-4">
                {data.getClientes.map(item => (
                    <li key={item.id} className="list-group-item">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                {item.nombre} {item.apellido} - {item.empresa}
                            </div>
                            <div className="col-md-4 d-flex justify-content-end">
                                <Mutation 
                                    mutation={ELIMINAR_CLIENTE}
                                    onCompleted={alert('df')}
                                >
                                    {eliminarCliente => (
                                        <button 
                                            type="button" 
                                            className="btn btn-danger d-block d-md-inline-block mr-2"
                                            onClick={()=>{
                                                eliminarCliente({
                                                    variables: {id:item.id}
                                                })
                                            }}

                                        >
                                            &times; Eliminar
                                        </button>
                                    )}
                                </Mutation>
                                <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                    Editar cliente
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default Contactos