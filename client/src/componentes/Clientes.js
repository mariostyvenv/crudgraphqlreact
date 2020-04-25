import React, {Fragment, useEffect, useState} from 'react'
import {useQuery, useMutation} from 'react-apollo'
import {CLIENTES_QUERY} from '../queries'
import {ELIMINAR_CLIENTE} from '../mutations'
import { Link} from 'react-router-dom'

const Contactos = () => {    
    const { data, error, loading } = useQuery(CLIENTES_QUERY,{
        fetchPolicy: 'network-only'
    })

    if(loading) return "Cargando..."
    if(error) return `Error: ${error.message}`
                
    return <Prueba data={data}/> 
}

const Prueba = ({data}) => {
    const [list, setList] = useState([])
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE)

    useEffect(() => {
        setList([...data.getClientes])
    }, [data])

    const deleteRegistro = indice => {
        list.splice(indice, 1);
        setList([...list])
    }

    return (
        <Fragment>
            <h2 className="text-center">Listado Clientes</h2>
            <ul className="list-group mt-4">
                {list.map((item, i) => (
                    <li key={item.id} className="list-group-item">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                {item.nombre} {item.apellido} - {item.empresa}
                            </div>
                            <div className="col-md-4 d-flex justify-content-end">
                               <button 
                                    type="button" 
                                    className="btn btn-danger d-block d-md-inline-block mr-2"
                                    onClick={()=> {
                                        eliminarCliente({
                                            variables: {id:item.id}
                                        })
                                        deleteRegistro(i)
                                    }}
                                >
                                    &times; Eliminar
                                </button>
                               
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